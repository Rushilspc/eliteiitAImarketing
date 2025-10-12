import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      )
    }

    const { imageDescription } = await request.json()

    const enhancementSystemPrompt = `You are a senior prompt engineer specializing in Google Imagen 3 prompts for India's top edtech brands. Your role is to transform a single-line marketing idea into a highly focused, versatile image prompt that drives engagement and aligns with best practices from leading edtech in india

MARKETING IMAGE GUIDELINES:
- Adapt to any campaign type: discounts, festive offers, course launches, success stories, testimonials, referral drives, or event announcements  
- Reflect brand professionalism with clean, modern design: uncluttered layouts, strong focal points, balanced negative space  
- Include relevant elements: product screenshots, certificates, trophies, animated icons, or abstract branding shapes—depending on idea  
- Use emotive cues: confident expressions, celebratory gestures, teamwork, aspiration, or curiosity  
- Ensure versatility: can feature students, instructors, icons, text overlays, symbolic imagery (e.g., rising arrows for growth, clocks for time-limited offers)  
- Maintain Indian market appeal: bright yet natural lighting, clear typography areas, culturally neutral backgrounds  

TECHNICAL OPTIMIZATION:
- Resolution: Ultra HD, 300 dpi  
- Composition: rule of thirds or centered focus, adjustable per idea  
- Lighting: even diffused daylight style or spotlight emphasis  
- Depth of Field: selective focus to highlight main subject  
- Color Palette: brand-aligned accent colors with high contrast for call-to-action  
- Style: photorealistic with graphic design polish, or stylized illustration if idea demands

USER IDEA: "${imageDescription}"

TASK:
Craft a detailed Google Imagen 3 prompt that:
1. Interprets the user's marketing idea accurately  
2. Selects appropriate visual elements (people, icons, symbols, backgrounds)  
3. Specifies detailed composition, lighting, and style  
4. Aligns with Indian edtech marketing standards  
5. Is ready for immediate generation by Imagen 3  

Output only the final enhanced prompt.`

    // Step 1: Enhance the prompt using OpenRouter
    const enhanceResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages: [
          {
            role: 'system',
            content: enhancementSystemPrompt
          },
          {
            role: 'user',
            content: `Enhance this image idea: ${imageDescription}`
          }
        ],
      }),
    })

    const enhanceData = await enhanceResponse.json()
    
    if (!enhanceResponse.ok) {
      throw new Error(enhanceData.error?.message || 'Failed to enhance prompt')
    }

    const enhancedPrompt = enhanceData.choices[0]?.message?.content || imageDescription

    // Step 2: Generate image using Freepik API (async task pattern)
    const freepikResponse = await fetch('https://api.freepik.com/v1/ai/text-to-image/imagen3', {
      method: 'POST',
      headers: {
        'x-freepik-api-key': process.env.FREEPIK_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: enhancedPrompt,
        num_images: 1,
        image: {
          size: 'landscape_4_3'
        }
      }),
    })

    const freepikData = await freepikResponse.json()
    
    if (!freepikResponse.ok) {
      throw new Error(freepikData.error?.message || 'Failed to generate image')
    }

    const taskId = freepikData.task_id
    
    if (!taskId) {
      throw new Error('No task ID returned from Freepik')
    }

    // Step 3: Poll for the result
    let imageUrl = ''
    let attempts = 0
    const maxAttempts = 30
    
    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000)) // Wait 2 seconds between polls
      
      const statusResponse = await fetch(`https://api.freepik.com/v1/ai/text-to-image/imagen3/${taskId}`, {
        headers: {
          'x-freepik-api-key': process.env.FREEPIK_API_KEY || '',
        }
      })
      
      const statusData = await statusResponse.json()
      
      if (statusData.task_status === 'COMPLETED' && statusData.generated && statusData.generated.length > 0) {
        imageUrl = statusData.generated[0]?.url || statusData.generated[0]?.base64 || ''
        break
      }
      
      if (statusData.task_status === 'FAILED') {
        throw new Error('Image generation failed')
      }
      
      attempts++
    }
    
    if (!imageUrl) {
      throw new Error('Image generation timed out')
    }

    return NextResponse.json({ 
      enhancedPrompt,
      imageUrl,
      originalIdea: imageDescription
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to generate image' },
      { status: 500 }
    )
  }
}
