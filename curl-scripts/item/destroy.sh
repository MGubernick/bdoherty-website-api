# TOKEN=" " ID=" " sh curl-scripts/item/destroy.sh

curl "http://localhost:4741/items/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \

echo
