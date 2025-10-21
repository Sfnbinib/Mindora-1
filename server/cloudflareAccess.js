import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';

const CF_JWKS = process.env.CF_JWKS_URI; // напр., https://YOUR_TEAM.cloudflareaccess.com/cdn-cgi/access/certs
const CF_AUD  = process.env.CF_AUD;      // AUD из Cloudflare Access (Application Audience Tag)

const client = jwksClient({ 
  jwksUri: CF_JWKS, 
  cache: true, 
  cacheMaxEntries: 5, 
  cacheMaxAge: 10*60*1000 
});

function getKey(header, callback){
  client.getSigningKey(header.kid, (err, key)=>{
    const signingKey = key?.getPublicKey();
    callback(err, signingKey);
  });
}

export function cfAccessRequired(req, res, next){
  const token = req.headers['cf-access-jwt-assertion']; // CF вставит автоматически
  if(!token) return res.status(401).send('No Access JWT');

  jwt.verify(token, getKey, { audience: CF_AUD, algorithms: ['RS256'] }, (err, decoded)=>{
    if(err) {
      console.error('CF Access JWT verification failed:', err);
      return res.status(401).send('Invalid Access JWT');
    }
    // Можно ещё проверить email из decoded (decoded.email)
    req.cfUser = decoded;
    next();
  });
}
