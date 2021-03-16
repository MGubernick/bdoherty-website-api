# TOKEN=" " ID='' NAME=" " AUTHOR=' ' TYPE='' INGREDIENTS={} DIRECTIONS='' sh curl-scripts/recipes/update.sh

curl "http://localhost:4741/items/${ID}" \
  --include \
  --request PATCH \
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
