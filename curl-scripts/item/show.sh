# TOKEN=" " ID=" " sh curl-scripts/item/show.sh

curl "http://localhost:4741/items/${ID}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \

echo
