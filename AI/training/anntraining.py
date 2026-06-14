import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

# === Load and clean data ===
df = pd.read_csv("f:/python/AI/finals/project/full_final-cleaned-data.csv")
df = df.drop(columns=["degree", "city"], errors='ignore')

# === Encode categorical data ===
label_encoders = {}
for column in ["gender", "profession"]:
    le = LabelEncoder()
    df[column] = le.fit_transform(df[column])
    label_encoders[column] = le

# === Split features and target ===
X = df.drop(columns=["depression"])
y = df["depression"]

# === Train-test split ===
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# === Build ANN model ===
model = Sequential([
    Dense(128, activation='relu', input_shape=(X.shape[1],)),
    Dense(64, activation='relu'),
    Dense(32, activation='relu'),
    Dense(1, activation='sigmoid')
])


# === Compile model ===
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# === Train model ===
model.fit(X_train, y_train, epochs=50, batch_size=32, validation_split=0.2, verbose=1)

# === Predict and evaluate ===
y_pred_prob = model.predict(X_test)
y_pred = (y_pred_prob > 0.5).astype(int)

accuracy = accuracy_score(y_test, y_pred)
print("\n ANN Model training complete!")
print(f"Accuracy on test set: {accuracy:.2f}\n")

print(" Classification Report:")
print(classification_report(y_test, y_pred))

print(" Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# # === Save model and encoders ===
# model.save("ann_depression_model.h5")
# joblib.dump(label_encoders, "ann_label_encoders.pkl")

print("💾 ANN model saved as 'ann_depression_model.h5'")
print("💾 Label encoders saved as 'ann_label_encoders.pkl'")
