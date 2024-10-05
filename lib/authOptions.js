import { db } from './db'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "email",
                    placeholder: "Email"
                },
                password:{
                    label:"Парола:",
                    type: "password",
                    placeholder: "Парола"
                }
            },
            async authorize(credentials){
                const existingUser = await db.users.findUnique({
                    where:{email:credentials?.email}
                });

                if(existingUser){
                    return null
                }

                const passwordMatch = await compare(credentials.password, existingUser.password)

                if(!passwordMatch){
                    return null
                }

                return{
                    id: `${existingUser.id}`,
                    email: existingUser.email
                }
            }
        })
    ],
    pages:{
        signIn: "/signin"
    }
}