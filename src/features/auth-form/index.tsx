import { useState } from "react"
import { login } from "../../shared/api/services/auth";
import { useAuthStore } from "../../app/store/auth";
import { useNavigate } from "react-router-dom";
import "./index.less";
import Button from "../../shared/ui/Button/index"
import { Input } from "antd";

export const AuthForm: React.FC = () => { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState<string | null>(null)
    const { setUserInfo } = useAuthStore();
    const navigate = useNavigate()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const res = await login(email, password);
        if (res) {
          console.log(res)
         setUserInfo(res);
         navigate("/homepage")
        }
      } catch (error) {
      console.log(error)
      setAuthError("Неверный логин или пароль!")
      };
    }

    return (
        <div className="form__container-outer">
            <form onSubmit={(e) => onSubmit(e)}>
            <div className="form__container-inner">
              <h3>Войдите в свой аккаунт</h3>
              <label htmlFor="email">
                <p className="form__container-inner--text">Адрес электронной почты</p>
              <Input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`form__container-inner--input ${authError !== null || email.length === 0 && 'form__container-inner--input-danger'}`} />
              {email.length === 0 && <p className="form__container-inner--text-danger">Введите адрес электронной почты</p>}
              {authError !== null && <p className="form__container-inner--text-danger">{authError}</p>}
              </label>
     
      
            <label htmlFor="password">
                <p className="form__container-inner--text">Пароль</p>
              <Input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`form__container-inner--input ${authError !== null || password.length === 0 && 'form__container-inner--input-danger'}`} />
              {password.length === 0 && <p className="form__container-inner--text-danger">Введите пароль</p>}
              {authError !== null && <p className="form__container-inner--text-danger">{authError}</p>}
              </label>
            <Button text="Продолжить" type="submit" style={{ width: "90%", marginLeft: "24px" }}>
                Продолжить
            </Button>
                <p style={{ marginBottom: '-15px' }}>Не удается войти <br />в систему?</p>
                </div>
            </form>
        </div>
    )
}