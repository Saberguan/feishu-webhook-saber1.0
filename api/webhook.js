export const config = {
  api: {
    bodyParser: true,
  },
};

// 最基础可运行的飞书 Webhook
export default function handler(req, res) {
  const body = req.body || {};

  // 飞书 URL Challenge 验证
  if (body.challenge) {
    return res.status(200).json({
      challenge: body.challenge,
    });
  }

  // 正常响应
  return res.status(200).send("ok");
}
