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
      throw new Error('Greeting text is required');
    }

    const apiKey = Deno.env.get('DASHSCOPE_API_KEY');
    if (!apiKey) {
      throw new Error('DASHSCOPE_API_KEY not configured');
    }

    // 调用通义万相生成图片
    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-DashScope-Async': 'enable',
      },
      body: JSON.stringify({
        model: 'wanx2.1-t2i-turbo',
        input: {
          prompt: `中国新年贺卡设计，马年主题，红色和金色为主色调，中国传统剪纸风格，精美的骏马图案，祥云纹饰，灯笼，烟花，福字，春联元素，喜庆吉祥的氛围，高清细腻，适合作为手机壁纸。画面中央留白区域用于放置祝福文字。`,
        },
        parameters: {
          size: '720*1280',
          n: 1,
        },
      }),
    });

    const taskData = await response.json();
    console.log('Task created:', JSON.stringify(taskData));

    if (!response.ok || !taskData.output?.task_id) {
      throw new Error(taskData.message || 'Failed to create image task');
    }

    const taskId = taskData.output.task_id;

    // 轮询等待任务完成
    let imageUrl = null;
    let attempts = 0;
    const maxAttempts = 60;

    while (!imageUrl && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const statusResponse = await fetch(`https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      const statusData = await statusResponse.json();
      console.log('Task status:', JSON.stringify(statusData));

      if (statusData.output?.task_status === 'SUCCEEDED') {
        imageUrl = statusData.output?.results?.[0]?.url;
        break;
      } else if (statusData.output?.task_status === 'FAILED') {
        throw new Error(statusData.output?.message || 'Image generation failed');
      }

      attempts++;
    }

    if (!imageUrl) {
      throw new Error('Image generation timeout');
    }

    return new Response(
      JSON.stringify({ imageUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});