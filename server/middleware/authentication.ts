import { useCookies, sendRedirect } from 'h3'

export default async (req, res) => {
    const cookies = useCookies(req)

    const { isAuthenticated = false } = JSON.parse(cookies["__session"] || "{}");
    const { url } = req;
    
    if (isAuthenticated && url === '/auth') {
        sendRedirect(res, '/')
    }
  }