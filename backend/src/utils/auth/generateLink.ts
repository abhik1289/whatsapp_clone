export function generateActivationLink(token:any): string {
  const frontend_url = process.env.FRONTEND_URL;
  const link = `${frontend_url}/${token}`;
  return link;
}
