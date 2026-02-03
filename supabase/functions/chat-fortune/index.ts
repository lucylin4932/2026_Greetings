import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const APP_ID = '319e66ed733f48c0aefa1a4a40eb8929';

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== Chat Fortune Function Started ===');
    
    const { message } = await req.json();
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: '请输入您的问题' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('User message:', message);
    
    // Get API key
    const apiKey = Deno.env.get('DASHSCOPE_API_KEY');
    if (!apiKey) {
      console.error('ERROR: DASHSCOPE_API_KEY not found');
      return new Response(
        JSON.stringify({ error: 'API密钥未配置' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Calling Alibaba Cloud Agent API...');

    // 调用阿里云百炼智能体应用API
    const response = await fetch(`https://dashscope.aliyuncs.com/api/v1/apps/${APP_ID}/completion`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: {
          prompt: message
        },
        parameters: {},
        debug: {}
      }),
    });

    console.log('API Response Status:', response.status);
    
    const responseText = await response.text();
    console.log('API Response Body:', responseText);

    if (!response.ok) {
      console.error('API returned error status:', response.status);
      return new Response(
        JSON.stringify({ error: `API调用失败 (${response.status})` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = JSON.parse(responseText);
    
    // 从智能体响应中提取回复内容
    const reply = data.output?.text || data.output?.finish_reason === 'stop' && data.output?.text || '';
    
    if (!reply) {
      console.error('No reply content in response:', data);
      return new Response(
        JSON.stringify({ error: '未收到回复内容' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Agent reply:', reply);
    console.log('=== Function Completed Successfully ===');

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('=== Function Error ===');
    console.error('Error:', error.message);
    
    return new Response(
      JSON.stringify({ error: error.message || '服务器错误' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});