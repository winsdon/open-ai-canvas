# 插件卡片：用户参考图 Logo

## 当前使用版本

根据用户提供的 8 列、9 行参考图，按图中名称从左到右、从上到下逐一裁切 68 个 Logo，替换此前的生成图。前 8 行每行 8 个，最后一行依次为 Eagle Assets、AI Art Critique、Media Conversion、Editing Workspace。

- 当前图片目录：`web/public/images/plugins/brand-logos-reference-v2/`。
- 精确插件 ID 映射沿用下表，覆盖 94 个插件 ID；已有品牌图标优先。
- 仅去除卡片背景、边框和名称标签，保留图形原色、渐变和内部白色细节，等比居中输出 128 × 128 透明 WebP。
- 页面显示尺寸仍为 32 × 32；暗色主题下深色 Logo 使用浅色底板，不使用反白滤镜。
- 裁切坐标、源图 SHA256 与逐项对应记录见同目录的 `plugin-reference-logo-mapping.json`。

以下提示词、颜色与批次说明仅记录旧版生成过程，当前图形以用户参考图为准。

## 旧版生成记录

按用户选择补齐全部缺少 Logo 的卡片：68 个品牌或工具标志覆盖 94 个插件 ID。同品牌的多个协议共用一个标志，原有品牌图标优先。新增标志是 AI 设计的自定义图形，不作为供应商官方 Logo 来源。

- 调用：`lumenimage_MCP.generate_image`，模型 `gpt-image-2`，质量 `high`，格式 `png`。
- 每批为 5 列 × 2 行设计板，共 7 批；请求尺寸为 1600 × 640，实际返回 1600 × 640 或 1600 × 1067，按实际行高拆分。
- 后处理：移除近白背景、统一纯色墨色、保留图形轮廓、居中归一化到 128 × 128 透明 WebP；页面按 32 × 32 显示于原有 52px 图标底板。
- 深色单色标志在暗色主题中反白显示。
- 图片：`web/public/images/plugins/brand-logos-v1/`。
- 映射：`web/src/pages/plugins/plugin-generated-logos.ts`，仅匹配精确插件 ID。

## 生图共同提示词

Use case: logo-brand. Create a production-ready LOGO SPRITE SHEET, exactly 1600 pixels wide and 640 pixels tall, organized into exactly 5 columns and 2 rows of square 320x320 cells. NO visible grid lines or cell borders. Pure flat white #FFFFFF background everywhere. Each cell contains exactly ONE independent small brand logo centered precisely in that cell, with a maximum bounding box of 200x200 pixels and at least 60px empty white padding. All logos have equal visual weight. Design language referenced from Baichuan's compact orange logo: clean 2D flat vector-style branding, 2 to 4 bold geometric strokes, intentional negative space, crisp straight edges or controlled smooth curves, strong compact silhouettes, excellent legibility when reduced to 32px. Use only the specified single solid ink color for each logo. No gradients, no shading, no light, no shadows, no 3D, no material, no texture, no illustration scene, no app-icon tile or colored background, no wordmark, no brand name caption, no cell number, no watermark. These are custom brand-associated emblems, not generic category icons and not plain typographic abbreviations. The names below are design context only, never render the names. Preserve exact reading order and exact cell counts. Cells are in row-major order, left-to-right, then top-to-bottom. Cell centers on row 1: (160,160),(480,160),(800,160),(1120,160),(1440,160). Row 2 centers: (160,480),(480,480),(800,480),(1120,480),(1440,480).

## 每格主题与映射

顺序与设计板一致，每连续 10 项为一批，最后两格留白。名称只用于描述目标，要求不渲染文字标签。

| Logo 文件 | 插件 ID | 颜色 | 对应主题提示词 |
| --- | --- | --- | --- |
| a6api.webp | `a6api` | #EC7A24 | A6api: an angular triangular gateway with six short inward-facing teeth, compact balanced silhouette. |
| adobe.webp | `adobe-firefly` | #E64236 | Adobe Firefly: a sharp open triangular A-shaped emblem with a single spark-shaped cutout. |
| agnes.webp | `agnes-image`, `agnes-video-25`, `agnes-video-v20` | #7256D8 | Agnes: a continuous curved triangular ribbon with one circular opening, confident distinctive silhouette. |
| async-audio.webp | `async-audio` | #E98827 | Async Audio: three stout sound-wave bars forming a circular loop with an arrow-shaped end. |
| autodl.webp | `autodl-comfyui` | #596CD6 | AutoDL: a compact angular lightning bolt nested inside an open hexagonal bracket. |
| baidu.webp | `baidu-qianfan-image`, `baidu-video` | #4779DD | Baidu Qianfan: a simple geometric sail made of three tapered upright pieces above a short curved hull. |
| bfl.webp | `bfl-flux` | #22252C | Black Forest Labs: three bold angular fir-tree triangles with a distinctive central negative-space notch. |
| cangyuan.webp | `cangyuan-midjourney` | #E38227 | Cangyuan: three parallel flowing vertical river bands with offset squared tops and gently hooked bases. |
| cheaper.webp | `cheaperinference-chat` | #24A089 | Cheaper Inference: a thick open circular C-shaped circuit with a small square cut from the right side. |
| cohere.webp | `cohere-chat-v2` | #427B69 | Cohere: two bold interlocking rounded organic loops, one small square tucked at the lower right. |
| relay.webp | `coolhs-wan3-relay` | #4A7FCC | WAN Relay: two opposing bold chevrons joined by a short central bridge, suggesting shared transport. |
| bailian.webp | `dashscope-minimax-video` | #E88324 | Bailian: a clean geometric three-petal lotus with strong vertical proportions. |
| dola.webp | `dola-pool` | #6458CB | Dola: a compact circular ring divided by a diagonal rounded bridge, a single rounded notch. |
| doubao.webp | `doubao-streaming-tts` | #488DCE | Doubao: a friendly minimal bean-shaped speech emblem with one thick vertical sound cutout. |
| fal.webp | `fal-queue-image`, `fal-queue-video` | #7654C4 | fal.ai: a bold three-pronged starburst made of three thick tapering fins, asymmetric yet balanced. |
| groq.webp | `groq-chat` | #E46E29 | Groq: an ultra-bold rounded g-shaped loop with an angular speed cut through the lower right. |
| ideogram.webp | `ideogram-image` | #272A32 | Ideogram: a compact solid square with a stylized lowercase i cut out as a rectangular stem and round dot. |
| image-tools.webp | `image-tools` | #D2842C | Image Tools: two offset crop corners and a small solid diamond forming a bold image-editing emblem. |
| kacang.webp | `kacang-midjourney` | #C47B35 | Kacang: two interlocked curved capsules creating a distinctive peanut-like double-loop shape. |
| kimi.webp | `kimi-chat` | #4269E4 | Kimi: a chunky asymmetric k-like geometric mark cut from two vertical slabs and one diagonal wing. |
| kling.webp | `kling-image`, `kling-video` | #DF7231 | Kling: a bold angular forward chevron joined to a rounded upright pill, one diagonal negative-space cut. |
| kemei.webp | `km-kemei-seedream`, `km-kemei-video` | #B858B0 | Kemei: two sculptural interlocked mountain peaks forming a compact abstract M crest. |
| litellm.webp | `litellm-proxy-chat` | #7C63C7 | LiteLLM: two parallel L-shaped right-angle brackets with short stepped ends. |
| localai.webp | `localai-chat` | #377F9A | LocalAI: a compact house outline made from thick blocks with a central diamond negative space. |
| luma.webp | `luma-dream-machine` | #32343F | Luma: a clean eclipse ring with three thick radiating rays integrated into its upper left. |
| gravity.webp | `lxmone-video-suite` | #486BC1 | Lxmone Gravity: a central solid circle and two heavy incomplete concentric orbital arcs. |
| maxforai.webp | `maxforai-video` | #D77A2D | MaxForAI: four compact rounded arrowheads meeting to form a symmetrical cross-shaped aperture. |
| metaso.webp | `metaso-h3` | #6359BE | Metaso: a bold abstract magnifying lens where the handle and ring form a small mountain cutout. |
| minimax.webp | `minimax-hailuo-video-v2`, `minimax-image`, `minimax-text-native` | #D34A70 | MiniMax: a broad rounded double-arch monogram with a centered V-shaped notch, compact strong silhouette. |
| mistral.webp | `mistral-chat` | #E88224 | Mistral: a compact pixel-built mountain-shaped M composed of large square blocks. |
| newapi.webp | `newapi-chat`, `newapi-media-task-v1`, `newapi-video-generations-v1` | #387CAF | NewAPI: two opposing right-angle hooks connected diagonally into an abstract N-shaped gateway. |
| novita.webp | `novita-video` | #7C54C2 | Novita: a bold four-point nova with asymmetrical ray lengths and a square center cutout. |
| nvidia.webp | `nvidia-nim-chat` | #679E31 | NVIDIA NIM: a compact stylized eye formed from a squared spiral and a solid small pupil. |
| alipay.webp | `official-payment-alipay-page` | #248DD0 | Alipay: a bold abstract flowing payment ribbon built from a horizontal bar, vertical stem and sweeping lower curve. |
| epay.webp | `official-payment-epay` | #2D9BA6 | Epay: a thick circular e-shaped spiral with a small forward-pointing wedge. |
| wechat.webp | `official-payment-wechat-native` | #35A66A | WeChat Pay: two overlapping compact solid speech bubbles with clean circular negative-space details. |
| xunhu.webp | `official-payment-xunhupay` | #E17927 | Xunhu Pay: a very simple upright chili-pepper silhouette with a broad curved body and one leaf. |
| zhifufm.webp | `official-payment-zhifufm` | #DB7545 | ZhifuFM: a circular coin silhouette with two thick radio-wave arcs rising on its right. |
| aliyun-sms.webp | `official-sms-aliyun` | #E87D27 | Aliyun SMS: two stout square cloud brackets surrounding a short horizontal message dash. |
| tencent-sms.webp | `official-sms-tencent` | #397ED4 | Tencent SMS: a bold cloud-shaped speech emblem with a small geometric arrow cutout. |
| ollama.webp | `ollama-chat` | #34343A | Ollama: an extremely simple bold llama head silhouette with two tall ears and a wide rounded muzzle, no fine lines. |
| pika.webp | `pika-via-fal` | #CE9750 | Pika: a compact rabbit-like head emblem with two slanted ears and a triangular play-shaped cutout. |
| pixverse.webp | `pixverse-video` | #6A5ACD | PixVerse: a chunky six-sided pixel prism made of three distinct interlocking flat facets. |
| qianwenai.webp | `qianwenai-maas-image` | #8A58BD | QianWenAI: two broad rounded speech ribbons crossing into an abstract open Q-shaped knot. |
| recraft.webp | `recraft-image` | #2D846A | Recraft: a heavy geometric r-like arch with a single triangular folded corner. |
| replicate.webp | `replicate-prediction-image`, `replicate-prediction-video` | #33343C | Replicate: three nested offset square-corner brackets forming a bold stepped repeat emblem. |
| rolldek.webp | `rolldek-wan-video` | #4F71C9 | RollDek: a compact two-part rolled film curl with a bold rectangular central opening. |
| runcrate.webp | `runcrate-chat` | #CE7830 | Runcrate: an open box represented by three thick angular pieces with a forward arrow cut through the center. |
| runninghub.webp | `runninghub-workflow`, `runninghub-workflow-provider` | #D56B30 | RunningHub: three bold interconnected nodes forming a compact angular running figure or branching hub. |
| runway.webp | `runway-image`, `runway-video` | #2D3038 | Runway: a compact sweeping r-shaped ribbon composed of two thick continuous turns. |
| seedance.webp | `seedance-videos-compatible` | #468A7C | Seedance: two solid opposing seed-shaped leaves creating a flowing S-shaped negative space. |
| stability.webp | `stability-image` | #9A58A4 | Stability AI: three nested open circular arcs with squared endpoints making a stable balanced radial emblem. |
| hunyuan.webp | `tencent-hunyuan-image`, `tencent-hunyuan-video` | #437FDB | Tencent Hunyuan: a bold continuous infinity-style knot with one sharp triangular interior aperture. |
| together.webp | `together-chat` | #4E7CCD | Together AI: three overlapping upright rounded bands bridged into a compact cooperative arch. |
| vertex.webp | `vertex-gemini`, `vertex-imagen`, `vertex-veo` | #408BC5 | Vertex AI: three broad triangular blades meeting at a central three-way negative-space junction. |
| vidu.webp | `vidu-video` | #378F8E | Vidu: a bold wide V-shaped check mark with a single rounded terminal and an angled notch. |
| vllm.webp | `vllm-chat` | #357A92 | vLLM: three thick staggered right-angle bars descending diagonally like a compact speed staircase. |
| volcengine.webp | `volcengine-ark-agent-plan-seedance`, `volcengine-ark-agent-plan-seedream`, `volcengine-ark-seedance`, `volcengine-ark-seedream`, `volcengine-jimeng-image`, `volcengine-jimeng-video`, `volcengine-mediakit` | #4283DC | Volcengine: a bold angular volcano flame made of two interlocking upward-pointing shards. |
| wavespeed.webp | `wavespeed-image-edit` | #328FBA | WaveSpeed: three horizontal broad wave bands ending in a sharp forward-pointing tip. |
| xai.webp | `xai-grok-chat`, `xai-grok-images`, `xai-video` | #252831 | xAI: a crisp heavy diagonal cross with one elongated ascending stroke and a small angular notch. |
| yi.webp | `yi-chat` | #4478C4 | Yi: two bold mirrored vertical curved strokes with a short offset horizontal bridge. |
| zhipu.webp | `zhipu-cogvideox`, `zhipu-cogview`, `zhipu-glm-chat` | #4A6BCB | Zhipu: three upright geometric intelligence pillars connected by a crisp diagonal negative-space slash. |
| feedback.webp | `user-feedback` | #DE832B | User Feedback: a stout rounded speech mark with a large central exclamation-shaped negative-space cutout. |
| prompt.webp | `prompt-optimizer` | #CF7A27 | Prompt Optimizer: a stylized fountain-pen nib merged with a four-point sparkle into one compact geometric mark. |
| eagle.webp | `eagle-asset-connector` | #408B9B | Eagle Assets: a minimal eagle wing and beak made of three bold upward-curving feather shapes. |
| critique.webp | `ai-art-critique` | #8A63BC | AI Art Critique: a bold stylized eye with a tilted diamond pupil and one check-shaped lower contour. |
| conversion.webp | `media-conversion` | #5483BD | Media Conversion: two thick opposing bent arrows forming an open square, with distinctive squared ends. |
| editor.webp | `editor-shell` | #DC852E | Editing Workspace: a bold geometric film-strip cut with a sharp diagonal blade, three large rectangular apertures. |
