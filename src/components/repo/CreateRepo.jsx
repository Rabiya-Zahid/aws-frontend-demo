import  React,{useState}    from    "react";
import  {useNavigate}   from    "react-router-dom";
import { useAuth } from "../../authContext.jsx";
import "./CreateRpo.css";
const CreateRepository = () => {
const { currentUser } = useAuth();
const navigate = useNavigate();

const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [visibility, setVisibility] = useState(true);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState(""); 
const handleSubmit = async (e) => {
e.preventDefault();

setError("");
setSuccess("");

const owner = currentUser || localStorage.getItem("userId");

if (!owner) {
  setError("Please login before creating a repository.");
  return;
}

if (!name.trim()) {
  setError("Repository name is required.");
  return;
}

try {
  setLoading(true);

  const response = await fetch(
    "http://13.53.40.184:3002/repo/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        owner,
        name: name.trim(),
        description: description.trim(),
        visibility,
        content: [],
        issues: [],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to create repository.");
  }

  setSuccess("Repository created successfully!");
  setName("");
  setDescription("");
  setTimeout(() => {
    navigate("/");
  }, 1000);
} catch (err) {
  setError(err.message || "Something went wrong.");
} finally {
  setLoading(false);
}

};
return (
<div className="create-repo-page">
<div className="create-repo-card">
<h1>Create a new repository</h1>

    <p>
      A repository contains your project's files and version history.
    </p>

    <form onSubmit={handleSubmit}>
      <label htmlFor="repo-name">Repository name *</label>
      <input
        id="repo-name"
        type="text"
        placeholder="my-first-repository"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="repo-description">Description </label>
      <textarea
        id="repo-description"
        placeholder="What is your repository about?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        required
      />

      <fieldset>
        <legend>Repository visibility</legend>

        <label>
          <input
            type="radio"
            name="visibility"
            checked={visibility === true}
            onChange={() => setVisibility(true)}
          />
          Public
        </label>

        <label>
          <input
            type="radio"
            name="visibility"
            checked={visibility === false}
            onChange={() => setVisibility(false)}
          />
          Private
        </label>
      </fieldset>

      {error && <p className="repo-error">{error}</p>}
      {success && <p className="repo-success">{success}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create repository"}
      </button>
    </form>
  </div>
</div>

);
};

export default CreateRepository;