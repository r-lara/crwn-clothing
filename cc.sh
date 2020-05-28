# Create Component[cc]

# get component name
COMP_NAME=$1

if [ "$COMP_NAME" = "" ]
then
  echo "missing parameter 'component'"
  exit
fi

mkdir "src/components/$COMP_NAME"
touch "src/components/$COMP_NAME/$COMP_NAME.component.jsx"
touch "src/components/$COMP_NAME/$COMP_NAME.styles.scss"

echo "$COMP_NAME was created"