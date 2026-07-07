import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  FiArrowLeft,
  FiUser,
  FiTag,
  FiPhone,
  FiMapPin,
  FiFileText,
  FiCalendar,
  FiUploadCloud,
  FiCheck,
} from "react-icons/fi";
import Layout from "../components/Layout.jsx";
import FormField from "../components/FormField.jsx";
import api from "../api/axios.js";

export default function ReportForm() {
  const { type } = useParams(); // "lost" | "found"
  const isLostItem = type !== "found";
  const navigate = useNavigate();
  const location = useLocation();
  const editingReport = location.state?.edit || null;

  const [form, setForm] = useState({
    name: editingReport?.name || "",
    item: editingReport?.item || "",
    contact: editingReport?.contact || "",
    location: editingReport?.location || "",
    description: editingReport?.description || "",
    date: editingReport?.date ? editingReport.date.slice(0, 10) : "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(editingReport?.imageUrl || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = new FormData();
      data.append("type", isLostItem ? "lost" : "found");
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (imageFile) data.append("image", imageFile);

      if (editingReport) {
        await api.put(`/reports/${editingReport._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/reports", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setSuccess(true);
      setTimeout(() => navigate(editingReport ? "/profile" : "/report-list"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Could not submit report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex-1 relative flex items-center justify-center px-4 py-10">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 sm:left-6 sm:top-6 w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition"
          aria-label="Go back"
        >
          <FiArrowLeft />
        </button>

        <form onSubmit={handleSubmit} className="glass-card w-full max-w-xl p-6 sm:p-8">
          <h1 className="gradient-text font-extrabold text-3xl tracking-tight text-center">
            {editingReport ? "Edit" : "Report"} {isLostItem ? "Lost" : "Found"} Item
          </h1>
          <p className="text-white/70 font-light text-center mt-2 mb-8">
            Fill in the details below as accurately as possible
          </p>

          <div className="space-y-5">
            <FormField
              label="Your Name"
              icon={<FiUser />}
              placeholder="Full name"
              value={form.name}
              onChange={update("name")}
              required
            />
            <FormField
              label="Item Name"
              icon={<FiTag />}
              placeholder="e.g. Black leather wallet"
              value={form.item}
              onChange={update("item")}
              required
            />
            <FormField
              label="Contact Info"
              icon={<FiPhone />}
              placeholder="Phone or email"
              value={form.contact}
              onChange={update("contact")}
              required
            />
            <FormField
              label="Location"
              icon={<FiMapPin />}
              placeholder={isLostItem ? "Where did you lose it?" : "Where did you find it?"}
              value={form.location}
              onChange={update("location")}
              required
            />
            <FormField
              label="Date"
              icon={<FiCalendar />}
              type="date"
              value={form.date}
              onChange={update("date")}
              required
            />
            <FormField
              label="Description"
              icon={<FiFileText />}
              as="textarea"
              rows={4}
              placeholder="Describe the item, any identifying marks, brand, color, etc."
              value={form.description}
              onChange={update("description")}
              required
            />

            <div>
              <label className="block text-white font-medium mb-2">Upload Photo</label>
              <label
                htmlFor="report-image"
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/25 rounded-2xl py-8 cursor-pointer hover:border-brand-cyan/60 hover:bg-white/5 transition"
              >
                {imagePreview ? (
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-40 rounded-lg object-cover"
                    />
                    <span className="text-brand-cyan flex items-center gap-1 text-sm">
                      <FiCheck /> Image selected
                    </span>
                  </div>
                ) : (
                  <>
                    <FiUploadCloud className="text-white/70" size={30} />
                    <span className="text-white/70 text-sm">
                      Click to upload an image (optional)
                    </span>
                  </>
                )}
              </label>
              <input
                id="report-image"
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </div>
          </div>

          {error && <p className="text-danger font-medium text-sm mt-4">{error}</p>}
          {success && (
            <p className="text-green-400 font-medium text-sm mt-4 flex items-center gap-1">
              <FiCheck /> Report submitted successfully!
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gradient w-full py-4 flex items-center justify-center mt-8 text-lg"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : editingReport ? (
              "Save Changes"
            ) : (
              "Submit Report"
            )}
          </button>
        </form>
      </div>
    </Layout>
  );
}
