// 让 Vercel 自动解析 JSON body
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

export default function handler(req, res) {
  try {
    const body = req.body || {};

    // 🚨 飞书 challenge 校验（关键！！）
    if (body.challenge) {
      return res.status(200).json({
        challenge: body.challenge,
      });
    }

    // 其他事件正常返回 200（避免飞书报错）
    return res.status(200).json({ code: 0, msg: "ok" });

  } catch (err) {
    return res.status(200).json({ code: 0, msg: "ok" });
  }
}
