import { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, collection } from "firebase/firestore";

export const AddnewProduct = () => {
  const [data, setData] = useState({
    title: "",
    price: 0,
    thumbnail: "",
    rating: 0.0,
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(data);

    const ref = doc(collection(db, "products"));
    const newdata = {
      title: data.title,
      price: data.price,
      thumbnail: data.thumbnail,
      rating: data.rating,
      description: data.description,
    };
    try {
      await setDoc(ref, newdata);
      setData({
        title: "",
        price: 0,
        thumbnail: "",
        rating: 0.0,
        description: "",
        category: "",
        image: "",
        brand: "",
        id: "",
      });
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <form style={styles.holder} onSubmit={handleSubmit}>
          <label style={styles.label}>
            Title
            <input
              style={styles.input}
              placeholder="Title"
              onChange={(e) =>
                setData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </label>
          <label style={styles.label}>
            Description
            <textarea
              style={styles.textarea}
              placeholder="Description"
              onChange={(e) =>
                setData((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </label>
          <label style={styles.label}>
            Price
            <input
              type="number"
              style={styles.input}
              placeholder="Price"
              onChange={(e) =>
                setData((prev) => ({ ...prev, price: e.target.value }))
              }
            />
          </label>
          <label style={styles.label}>
            Rating
            <input
              type="number"
              style={styles.input}
              placeholder="Rating"
              onChange={(e) =>
                setData((prev) => ({ ...prev, rating: e.target.value }))
              }
            />
          </label>
          <label style={styles.label}>
            Image
            <input
              style={styles.input}
              placeholder="Image Url"
              onChange={(e) =>
                setData((prev) => ({ ...prev, thumbnail: e.target.value }))
              }
            />
          </label>

          <button style={styles.addProduct}>Add Product</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "white",
  },
  container: {
    margin: "0 auto",
    width: "60%",
    border: "2px solid rgb(255, 119, 7)",
    borderRadius: "5px",
    padding: "10px",
    marginTop: "30px",
    backgroundColor: "gray",
  },
  holder: {
    display: "flex",
    flexDirection: "column",
    padding: "5px",
    margin: "5px",
  },
  label: {
    textAlign: "left",
    color: "white",
    fontWeight: "bold",
    fontSize: "x-large",
  },
  input: {
    height: "50px",
    width: "100%",
    border: "2px solid black",
    marginBottom: "10px",
    marginTop: "10px",
    borderRadius: "10px",
    fontWeight: "bold",
  },
  textarea: {
    height: "50px",
    width: "100%",
    border: "2px solid black",
    borderRadius: "10px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  addProduct: {
    backgroundColor: "green",
    width: "20%",
    color: "white",
    marginTop: "30px",
    marginLeft: "50px",
    fontWeight: "bold",
    fontSize: "x-large",
    borderRadius: "4px",
  },
};
