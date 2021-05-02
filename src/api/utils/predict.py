import pandas as pd
from sklearn.preprocessing import LabelEncoder
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_validate
from sklearn.metrics import plot_confusion_matrix
import pickle

import pathlib
import os

file_path_abs = pathlib.Path(__file__).parent.absolute()

# Inspect Data
pd.set_option('display.max_columns', 50)
pd.set_option('display.max_rows', 10000)
df = pd.read_csv(os.path.join(file_path_abs, "data", "dataset.csv"))

# Data spread
data_spread = df['Disease'].value_counts().reset_index()

# Model does not accept nan values, so we need to change them
df.fillna('No Symptom', inplace=True)
df = df.applymap(lambda row: row.strip())

# Create unique symptoms list in order to encode them
symptoms_list = []
for i in range(1, 18):
    symptoms = df.iloc[:, i].unique()
    for symptom in symptoms:
        if symptom not in symptoms_list:
            symptoms_list.append(symptom)

# Encoding label
label_encoder = LabelEncoder().fit(np.array(symptoms_list))
np.save(os.path.join(file_path_abs, "models",
                     "encoder_symptoms.npy"), label_encoder.classes_)
np.save(os.path.join(file_path_abs, "models",
                     "symptoms"), np.array(symptoms_list))
for i in range(1, 18):
    df.iloc[:, i] = label_encoder.transform(df.iloc[:, i])

# Create feature set(x) and target(y)
x = df.iloc[:, 1:]
y = df['Disease']
# Train test split
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2)

# Random Forest for classification
disease_forest = RandomForestClassifier()
scores = cross_validate(disease_forest, x, y, cv=10, scoring=[
                        'precision_macro', 'f1_macro', 'recall_macro'])

disease_forest.fit(x_train, y_train)
plot_confusion_matrix(disease_forest, x_test, y_test)
pickle.dump(disease_forest, open(os.path.join(
    file_path_abs, "models", "disease_forest.sav"), 'wb'))

# Get description df
descriptions_df = pd.read_csv(os.path.join(
    file_path_abs, "data", "symptom_Description.csv"))

# Get precautions df
precautions_df = pd.read_csv(os.path.join(
    file_path_abs, "data", "symptom_precaution.csv"))


# user_input -> ['cough', 'headache', 'sweating']
def predict_from_symptoms(user_input):
    while len(user_input) < 17:
        user_input.append('No Symptom')

    # Encode user input and predict top 3 possible diagnoses
    user_input = label_encoder.transform(np.array(user_input)).reshape(-1, 17)
    diagnose = disease_forest.predict_proba(user_input)
    index_of_maximum_proba = diagnose.argsort()[0][-5:][::-1]
    predicted_classes = disease_forest.classes_[index_of_maximum_proba]

    # Precaution and
    precaution_description_df = pd.merge(
        descriptions_df, precautions_df, how='outer')
    precaution_description_df.to_csv(os.path.join(
        file_path_abs, "data", "precaution_description.csv"))
    precaution_description_df = precaution_description_df.set_index(
        'Disease').loc[predicted_classes]
    precaution_description_df['Probability'] = pd.Series(data=diagnose[0][index_of_maximum_proba], index=predicted_classes).apply(
        lambda probability: str(round(probability*100, 1)) + '%')
    precaution_description_df = precaution_description_df.where(
        pd.notnull(precaution_description_df), None)

    precaution_description_dict = precaution_description_df.T.to_dict()

    return precaution_description_dict
