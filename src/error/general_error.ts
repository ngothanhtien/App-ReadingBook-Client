const isValidPassword = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,25}$/;
  return regex.test(password);
};
const onlyRegularChar = (str:string) => {
    const regex = /^[\p{L}\s]+$/u;
    return regex.test(str);
}
const onlyRegularCharAndNumber = (str: string) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(str)
}
const isValidEmail = (str: string) => {
    const regex = /^[\w.-]+@gmail\.com$/i;
    return regex.test(str);
}
const validators = {
    isValidPassword,
    onlyRegularChar,
    onlyRegularCharAndNumber,
    isValidEmail
}
export default validators;