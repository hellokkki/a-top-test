import { AuthForm } from "../../features/auth-form"
import Logo from "../../app/assets/logo"

export const LoginPage = () => {
    return (<div style={{ marginTop: "50px" }}>
     <Logo  style={{ marginBottom: "50px" }}/>
     <AuthForm/>
    </div>)
}
