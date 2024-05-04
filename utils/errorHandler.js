const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "", phoneNumber: "" };

  // duplicate email or phoneNumber error
  if (err.code === 11000) {
    if (err.message.includes("email_1 dup key")) {
      errors.email = "That email is already registered";
    } else {
      errors.phoneNumber = "That phone number is already registered";
    }
  }

  // validation errors
  if (err.message.includes("User validation failed")) {
    console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  // password validation error
  if (err.message.includes("Password is not strong enough!")) {
    errors.password = err.message;
  }

  return errors;
};

export default handleErrors;
