export const Recaptha = async (req, res, next) => {
    let data = req.body;
    if (!data.recaptchaToken) {
      return res.json({
        type: "error",
        msg: "RecaptchaToken Not Found",
      });
    }
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${data.recaptchaToken}`;
  
    try {
      const response = await fetch(url, {
        method: "post",
      });
      const google_response = await response.json();
      delete data.recaptchaToken;
      let passedData = {
        ...data,
        google_score: google_response,
      };
      //Burda Şart koyulup ona göre yönlendirme yapılmalı
      delete data.google_score;
      // console.log('recaptcha passedData',passedData)
    } catch (error) {
      return res.json({
        type: "error",
        msg: "Recaptcha Post Error",
      });
    }
    next();
  };
  