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
    const apiKey = Deno.env.get('DASHSCOPE_API_KEY');
    if (!apiKey) {
      console.error('DASHSCOPE_API_KEY not configured');
      throw new Error('API密钥未配置');
    }

    console.log('Calling Alibaba Cloud Qwen API...');

    const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen-max',
        messages: [
          {
            role: 'system',
            content: '你是一位精通中国传统文化的文学大师，专门创作新春贺词。2026年是农历马年，请创作一条富有文采、朗朗上口的马年新春祝福语。要求：1.必须包含"马"字或与马相关的成语、典故 2.祝福语要有文化内涵，对仗工整 3.内容积极向上，适合发给长辈、朋友、同事 4.长度控制在50-80字之间 5.不要使用emoji或特殊符号 6.直接输出贺词内容，不要有任何前缀说明'
          },
          {
            role: 'user',
            content: '请生成一条马年新春贺词'
          }
        ],
        temperature: 0.9,
        max_tokens: 200,
      }),
    });

    const responseText = await response.text();
    console.log('API Response status:', response.status);
    console.log('API Response body:', responseText);

    if (!response.ok) {
      throw new Error(`API返回错误: ${response.status} - ${responseText}`);
    }

    const data = JSON.parse(responseText);
    const greeting = data.choices?.[0]?.message?.content?.trim();
    
    if (!greeting) {
      throw new Error('未能生成贺词内容');
    }

    console.log('Generated greeting:', greeting);

    return new Response(
      JSON.stringify({ greeting }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error details:', error);
    return new Response(
      JSON.stringify({ error: error.message || '生成贺词失败，请稍后重试' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});