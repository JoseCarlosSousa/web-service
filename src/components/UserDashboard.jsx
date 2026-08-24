import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ProfileForm from "./ProfileForm";
import "./UserDashboard.css";

export default function UserDashboard() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(
      `${import.meta.env.VITE_CUSTOMER_API_URL}/api/customers/me`,
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
      .then((res) =>
        res.ok ? res.json() : Promise.reject(),
      )
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
    setFormData((prev) => ({ ...prev, [name]: value }));
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

      setMessage(
        response.ok
          ? t("profile_update_success")
          : t("profile_update_error"),
      );
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
      <h3 className="profile-title">
        👤 {t("profile_title")}
      </h3>
      <p className="profile-subtitle">
        {t("profile_subtitle")}
      </p>
      {message && (
        <div className="profile-message">{message}</div>
      )}

      <ProfileForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
