import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { COUNTRY_PREFIXES } from "../constants/countries";

import "./UserDashboard.css";

export default function UserDashboard({ userId }) {
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

  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const baseUrl = import.meta.env.VITE_CUSTOMER_API_URL;
  const targetUrl = userId
    ? `${baseUrl}/api/customers/${userId}`
    : `${baseUrl}/api/customers/me`;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setIsEditing(false);

    fetch(targetUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(
          `Server responded with status ${res.status}`,
        );
      })
      .then((data) => {
        if (data) {
          const freshData = {
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
          };
          setFormData(freshData);
          setInitialData(freshData);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load profile data:", err);
        setLoading(false);
      });
  }, [targetUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelClick = () => {
    setFormData(initialData);
    setIsEditing(false);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(targetUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(t("profile_update_success"));
        setInitialData(formData);
        setIsEditing(false);
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
      <p className="profile-loading">
        {t("loading_profile")}...
      </p>
    );
  }

  return (
    <div className="user-profile-section">
      <div className="profile-title-container">
        <h3 className="profile-title">
          👤{" "}
          {userId
            ? `${t("profile_title")} (ID: ${userId})`
            : t("profile_title")}
        </h3>
        <button
          type="button"
          onClick={
            isEditing
              ? handleCancelClick
              : () => setIsEditing(true)
          }
          className={
            isEditing
              ? "btn-table-cancel"
              : "btn-table-edit"
          }
        >
          {isEditing
            ? `❌ ${t("btn_cancel") || "Cancelar"}`
            : `✏️ ${t("btn_edit") || "Editar"}`}
        </button>
      </div>
      <p className="profile-subtitle">
        {t("profile_subtitle")}
      </p>

      {message && (
        <div className="profile-message">{message}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="profile-form"
      >
        <div className="form-row">
          <div className="form-field">
            <label className="form-label">
              {t("form_first_name")}
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="form-input"
              required
              disabled={!isEditing}
            />
          </div>
          <div className="form-field">
            <label className="form-label">
              {t("form_last_name")}
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="form-input"
              required
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label className="form-label">
              {t("form_email")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="form-input"
            />
          </div>
          <div className="form-field">
            <label className="form-label">
              {t("form_gender")}
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-input"
              disabled={!isEditing}
            >
              <option value="">{t("select_option")}</option>
              <option value="MALE">
                {t("gender_male")}
              </option>
              <option value="FEMALE">
                {t("gender_female")}
              </option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label className="form-label">
              {t("form_phone_prefix")}
            </label>
            <select
              name="phonePrefix"
              value={formData.phonePrefix}
              onChange={handleChange}
              className="form-input"
              required
              disabled={!isEditing}
            >
              <option value="">{t("select_option")}</option>
            {COUNTRY_PREFIXES.map((prefix) => (
              <option key={prefix.code} value={prefix.code}>
                {prefix.name}
              </option>
            ))}
            </select>
          </div>
          <div className="form-field">
            <label className="form-label">
              {t("form_phone_number")}
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="form-input"
              required
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">
            {t("form_address")}
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-input"
            disabled={!isEditing}
          />
        </div>
        <div className="form-row-triple">
          <div className="form-field">
            <label className="form-label">
              {t("form_city")}
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-input"
              disabled={!isEditing}
            />
          </div>
          <div className="form-field">
            <label className="form-label">
              {t("form_state")}
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="form-input"
              disabled={!isEditing}
            />
          </div>
          <div className="form-field">
            <label className="form-label">
              {t("form_zip_code")}
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="form-input"
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">
            {t("form_country")}
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="form-input"
            disabled={!isEditing}
          />
        </div>
        {isEditing && (
          <button type="submit" className="btn-save">
            {t("btn_save_changes")}
          </button>
        )}
      </form>
    </div>
  );
}
