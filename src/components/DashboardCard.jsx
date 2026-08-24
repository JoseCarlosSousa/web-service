import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function UserDashboard() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phonePrefix: "",
    phoneNumber: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const countryPrefixes = [
    { code: "+351", name: "Portugal (+351)" },
    { code: "+49", name: "Germany (+49)" },
    { code: "+44", name: "United Kingdom (+44)" },
    { code: "+34", name: "Spain (+34)" },
    { code: "+33", name: "France (+33)" },
    { code: "+39", name: "Italy (+39)" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_CUSTOMER_API_URL}/api/customers/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
        },
      },
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(
          `Server responded with status ${res.status}`,
        );
      })
      .then((data) => {
        if (data) {
          setFormData({
            email: data.email || "",
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            phonePrefix: data.phonePrefix || "",
            phoneNumber: data.phoneNumber || "",
            gender: data.gender || "",
            address: data.address || "",
            city: data.city || "",
            state: data.state || "",
            zipCode: data.zipCode || "",
            country: data.country || "",
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Failed to load authenticated profile data:",
          err,
        );
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_CUSTOMER_API_URL}/api/customers/me`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token && {
              Authorization: `Bearer ${token}`,
            }),
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        setMessage(t("profile_update_success"));
      } else {
        setMessage(t("profile_update_error"));
      }
    } catch (error) {
      console.error(
        "Error submitting profile update:",
        error,
      );
      setMessage(t("profile_update_error"));
    }
  };

  if (loading) {
    return (
      <p style={{ textAlign: "center", padding: "20px" }}>
        {t("loading_profile")}...
      </p>
    );
  }

  const styles = {
    section: {
      maxWidth: "600px",
      margin: "30px auto",
      padding: "25px",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    title: {
      borderBottom: "2px solid #2ecc71",
      paddingBottom: "10px",
      margin: "0 0 8px 0",
      fontSize: "22px",
      color: "#2c3e50",
    },
    subtitle: {
      color: "#7f8c8d",
      fontSize: "14px",
      margin: "0 0 20px 0",
    },
    message: {
      padding: "12px",
      marginBottom: "20px",
      backgroundColor: "#e8f4fd",
      borderRadius: "6px",
      color: "#007bff",
      fontSize: "14px",
      fontWeight: "500",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "18px",
    },
    row: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "15px",
    },
    field: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#34495e",
    },
    input: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
      outline: "none",
      backgroundColor: "#ffffff",
      transition: "border-color 0.2s",
    },
    inputDisabled: {
      backgroundColor: "#f8f9fa",
      color: "#7f8c8d",
      cursor: "not-allowed",
    },
    btnSave: {
      backgroundColor: "#2ecc71",
      color: "#ffffff",
      padding: "12px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "16px",
      marginTop: "10px",
    },
  };

  return (
    <div
      className="user-profile-section"
      style={styles.section}
    >
      <h3 style={styles.title}>👤 {t("profile_title")}</h3>
      <p style={styles.subtitle}>{t("profile_subtitle")}</p>

      {message && (
        <div style={styles.message}>{message}</div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Nome e Apelido */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>
              {t("form_first_name")}
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>
              {t("form_last_name")}
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div style={styles.field}>
          <label style={styles.label}>
            {t("form_email")}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            style={{
              ...styles.input,
              ...styles.inputDisabled,
            }}
          />
        </div>

        {/* Indicativo (Lista por Países) e Telefone */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>
              {t("form_phone_prefix")}
            </label>
            <select
              name="phonePrefix"
              value={formData.phonePrefix}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">{t("select_option")}</option>
              {countryPrefixes.map((prefix) => (
                <option
                  key={prefix.code}
                  value={prefix.code}
                >
                  {prefix.name}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>
              {t("form_phone_number")}
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
        </div>

        {/* Género (Menu de Escolha) */}
        <div style={styles.field}>
          <label style={styles.label}>
            {t("form_gender")}
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">{t("select_option")}</option>
            <option value="MALE">{t("gender_male")}</option>
            <option value="FEMALE">
              {t("gender_female")}
            </option>
            <option value="OTHER">
              {t("gender_other")}
            </option>
          </select>
        </div>

        {/* Morada */}
        <div style={styles.field}>
          <label style={styles.label}>
            {t("form_address")}
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {/* Cidade e Distrito */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>
              {t("form_city")}
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>
              {t("form_state")}
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>

        {/* Código Postal e País */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>
              {t("form_zip_code")}
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>
              {t("form_country")}
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>

        <button type="submit" style={styles.btnSave}>
          {t("btn_save_changes")}
        </button>
      </form>
    </div>
  );
}
