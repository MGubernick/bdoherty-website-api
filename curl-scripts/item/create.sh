# TOKEN='' NAME='' SOLD='false' PRICE=## MSR='' CAT='' IMG='' DES='' sh curl-scripts/items/create.sh

curl 'http://localhost:4741/items' \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "item": {
      "name": "'"${NAME}"'",
      "purchased": "'"${SOLD}"'",
      "price": "'"${PRICE}"'",
      "measurements": "'"${MSR}"'",
      "category": "'"${CAT}"'",
      "imageURL": "'"${IMG}"'",
      "description": "'"${DES}"'"
    }
  }'

echo
