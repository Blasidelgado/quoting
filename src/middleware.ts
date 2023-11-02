export { default } from "next-auth/middleware";

export const config = { matcher: ["/", "/profile", "/clients", "/inventory", "/price-lists", "/quoting"] };

