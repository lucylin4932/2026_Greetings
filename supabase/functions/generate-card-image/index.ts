import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { greeting } = await req.json();
    
    if (!greeting) {
      throw new Error('需要提供贺词内容');
    }

    const apiKey = Deno.env.get('DASHSCOPE_API_KEY');
    if (!apiKey) {
      console.error('DASHSCOPE_API_KEY not configured');
      throw new Error('API密钥未配置');
    }

    console.log('Creating image generation task...');
    console.log('Greeting:', greeting);

    // 调用通义万相生成图片
    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-DashScope-Async': 'enable',
      },
      body: JSON.stringify({
        model: 'wanx-v1',
        input: {
          prompt: '中国新年贺卡设计，马年主题，红色和金色为主色调，中国传统剪纸风格，精美的骏马图案，祥云纹饰，灯笼，烟花，福字，春联元素，喜庆吉祥的氛围，高清细腻，适合作为手机壁纸，画面中央留白区域用于放置祝福文字，精美插画风格',
        },
        parameters: {
          size: '720*1280',
          n: 1,
        },
      }),
    });

    const responseText = await response.text();
    console.log('Task creation response status:', response.status);
    console.log('Task creation response:', responseText);

    if (!response.ok) {
      throw new Error(`创建任务失败: ${response.status} - ${responseText}`);
    }

    const taskData = JSON.parse(responseText);
    const taskId = taskData.output?.task_id;

    if (!taskId) {
      throw new Error('未能获取任务ID');
    }

    console.log('Task created with ID:', taskId);

    // 轮询等待任务完成
    let imageUrl = null;
    let attempts = 0;
    const maxAttempts = 60;

    while (!imageUrl && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      attempts++;
      
      console.log(`Checking task status (attempt ${attempts}/${maxAttempts})...`);

      const statusResponse = await fetch(`https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      const statusText = await statusResponse.text();
      console.log('Status check response:', statusText);

      const statusData = JSON.parse(statusText);

      if (statusData.output?.task_status === 'SUCCEEDED') {
        imageUrl = statusData.output?.results?.[0]?.url;
        console.log('Image generated successfully:', imageUrl);
        break;
      } else if (statusData.output?.task_status === 'FAILED') {
        throw new Error(`图片生成失败: ${statusData.output?.message || '未知错误'}`);
      }

      console.log('Task status:', statusData.output?.task_status);
    }

    if (!imageUrl) {
      throw new Error('图片生成超时，请稍后重试');
    }

    return new Response(
      JSON.stringify({ imageUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error details:', error);
    return new Response(
      JSON.stringify({ error: error.message || '生成图片失败，请稍后重试' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});