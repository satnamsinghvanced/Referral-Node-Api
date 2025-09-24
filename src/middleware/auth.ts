    import jwt from "jsonwebtoken";
    import dotenv from "dotenv";
    dotenv.config();
    
    const secretKey = process.env.JWT_SECRET || "testsecretkey";
    
    const auth = (req: any, res: any, next: any) => {
      try {
        const token = req.header("Authorization");
    
        if (!token) {
          return res
            .status(401)
            .json({ message: "Authorization Token is Missing" });
        }
    
        jwt.verify(token, secretKey, async (error: any, decoded: any) => {
          if (error) {
            if (error.name === "TokenExpiredError") {
              return res.status(498).json({ message: "Token has expired" });
            }
            console.log(error.message);
            return res.status(700).json({ message: "Invalid token" });
          }
    
          if (!decoded.userId) {
            console.log(decoded.userId);
            return res
              .status(700)
              .json({ message: "Token is invalid: ID not found" });
          }
          if (!decoded.role) {
            console.log(decoded.role);
            return res
              .status(700)
              .json({ message: "Token is invalid: ID not found" });
          }
          req.user = decoded;
          next();
        });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
    
    export default auth;
    