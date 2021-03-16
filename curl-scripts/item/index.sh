# TOKEN=" " sh curl-scripts/item/index.sh

curl 'http://localhost:4741/items/all' \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \

echo
