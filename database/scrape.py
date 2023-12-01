import requests
import csv

def fetch_data(url):
  try:
    response = requests.get(url)
    if response.status_code == 200:
      return response.json()
    else:
      print(f"Request failed with status code: {response.status_code}")
      return None
  except requests.RequestException as e:
    print(f"Request failed: {e}")
    return None

url_to_fetch = 'https://www.sreality.cz/api/en/v2/estates?category_main_cb=1&category_type_cb=1&per_page=500&tms=1701251561100'
data = fetch_data(url_to_fetch)

if data:
  print("Data retrieved successfully:")
  apartments = []
  for apartment in data['_embedded']['estates']:
    apartments.append({ 'title': apartment['name'], 'image_url': apartment['_links']['images'][0]['href'] })
  
  with open('dataset/apartments.csv', 'w', newline='', encoding='utf-8') as file:
    writer = csv.DictWriter(file, fieldnames=apartments[0].keys())
    writer.writeheader()
    for data in apartments:
      writer.writerow(data)
else:
  print("Failed to fetch data from the URL.")