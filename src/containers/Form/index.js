import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    choice: "",
    fieldEmail: "",
    comment: "",
  });
  const resetForm = () => {
    setFormData({
      lastName: "",
      firstName: "",
      choice: "",
      fieldEmail: "",
      comment: "",
    });
  };
  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setEmailError("Veuillez entrer une adresse email valide");
    } else {
      setEmailError("");
    }
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
        resetForm()
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            placeholder=""
            label="Nom"
            value={formData.lastName}
            onChange={(value) => setFormData({...formData, lastName: value})}
          />
          <Field
            placeholder=""
            label="Prénom"
            value={formData.firstName}
            onChange={(value) => setFormData({...formData, firstName: value})}
          />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={(value) => setFormData({...formData, choice: value})}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
            value={formData.choice}
          />
          <Field
            placeholder=""
            label="Email"
            validate={validateEmail}
            value={formData.fieldEmail}
            onChange={(value) => setFormData({...formData, fieldEmail: value})}
          />
          {emailError && <div className="error">{emailError}</div>}
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={formData.comment}
            onChange={resetForm}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
