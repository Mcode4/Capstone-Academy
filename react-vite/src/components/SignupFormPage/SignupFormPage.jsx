import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
    if(firstName.length > 25){
      return setErrors({
        firstName : "First Name must be 25 characters or less"
      })
    }
    if(lastName.length > 25){
      return setErrors({
        lastName : "Last Name must be 25 characters or less"
      })
    }
    if(username.length > 25){
      return setErrors({
        username : "Username must be 25 characters or less"
      })
    }
    if(email.length > 50){
      return setErrors({
        email : "Email must be 50 characters or less"
      })
    }


    const serverResponse = await dispatch(
      thunkSignup({
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      console.log('ERRORS: ', serverResponse)
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="form-page">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
      <label>
          First Name*
          <input
            type="text"
            value={firstName}
            class="form-control"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <br />
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            class="form-control"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <br />
        <label>
          Email*
          <input
            type="text"
            value={email}
            class="form-control"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <br />
        <label>
          Username*
          <input
            type="text"
            value={username}
            class="form-control"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <br />
        <label>
          Password*
          <input
            type="password"
            value={password}
            class="form-control"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <br />
        <label>
          Confirm Password*
          <input
            type="password"
            value={confirmPassword}
            class="form-control"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <br />
        <button className='btn btn-primary btn-lg mt-2' type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
