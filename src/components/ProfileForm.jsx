import FormInput from "./FormInput";
import { COUNTRY_PREFIXES } from "../constants/countries";
import { useTranslation } from "react-i18next";

export default function ProfileForm({ formData, onChange, onSubmit }) {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} className="profile-form">
      {/* Nome e Apelido */}
      <div className="form-row">
        <FormInput label={t("form_first_name")} name="firstName" value={formData.firstName} onChange={onChange} required />
        <FormInput label={t("form_last_name")} name="lastName" value={formData.lastName} onChange={onChange} required />
      </div>

      {/* Email e Género */}
      <div className="form-row">
        <FormInput label={t("form_email")} name="email" value={formData.email} onChange={onChange} disabled />
        <div className="form-field">
          <label className="form-label">{t("form_gender")}</label>
          <select name="gender" value={formData.gender} onChange={onChange} className="form-input">
            <option value="">{t("select_option")}</option>
            <option value="MALE">{t("gender_male")}</option>
            <option value="FEMALE">{t("gender_female")}</option>
          </select>
        </div>
      </div>

      {/* Indicativo e Telefone */}
      <div className="form-row">
        <div className="form-field">
          <label className="form-label">{t("form_phone_prefix")}</label>
          <select name="phonePrefix" value={formData.phonePrefix} onChange={onChange} className="form-input" required>
            <option value="">{t("select_option")}</option>
            {COUNTRY_PREFIXES.map((prefix) => (
              <option key={prefix.code} value={prefix.code}>
                {prefix.name}
              </option>
            ))}
          </select>
        </div>
        <FormInput label={t("form_phone_number")} name="phoneNumber" value={formData.phoneNumber} onChange={onChange} required />
      </div>

      {/* Morada Completa */}
      <FormInput label={t("form_address")} name="address" value={formData.address} onChange={onChange} />

      {/* Cidade, Distrito e Código Postal */}
      <div className="form-row-triple">
        <FormInput label={t("form_city")} name="city" value={formData.city} onChange={onChange} />
        <FormInput label={t("form_state")} name="state" value={formData.state} onChange={onChange} />
        <FormInput label={t("form_zip_code")} name="zipCode" value={formData.zipCode} onChange={onChange} />
      </div>

      {/* País */}
      <FormInput label={t("form_country")} name="country" value={formData.country} onChange={onChange} />

      {/* Botão Salvar */}
      <button type="submit" className="btn-save">
        {t("btn_save") || "Salvar Alterações"}
      </button>
    </form>
  );
}
