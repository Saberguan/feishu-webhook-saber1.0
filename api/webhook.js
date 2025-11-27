// 让 Vercel 正常处理 JSON body
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

export default async function handler(req, res) {
  try {
    const body = req.body || {};

    // 1. 飞书 URL challenge 校验
    if (body.challenge) {
      return res.status(200).json({
        challenge: body.challenge,
      });
    }

    // 2. 任意事件返回 200（防止飞书超时）
    return res.status(200).json({ code: 0, msg: "ok" });
    
  } catch (error) {
    return res.status(200).json({ code: 0, msg: "ok" });
  }
}
