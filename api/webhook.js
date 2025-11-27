export const config = {
  api: {
    bodyParser: false, // 必须关闭，飞书需要 raw body
  },
};

export default async function handler(req, res) {
  try {
    const rawBody = await getRawBody(req);
    const body = JSON.parse(rawBody.toString());

    // ✅ 飞书 URL 校验：返回 challenge 字段
    if (body.challenge) {
      return res.status(200).json({
        challenge: body.challenge,
      });
    }

    // 其它事件返回 OK
    return res.status(200).json({ code: 0, msg: "ok" });

  } catch (e) {
    return res.status(200).json({ code: 0, msg: "ok" });
  }
}

// 工具函数
function getRawBody(req) {
  return new Promise((resolve) => {
    let data = [];
    req.on("data", chunk => {
      data.push(chunk);
    });
    req.on("end", () => {
      resolve(Buffer.concat(data));
    });
  });
}
