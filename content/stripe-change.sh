cd stripe-test
for FILE in *;
do
cd $FILE
echo - >> ../../images.yaml
cat description.yaml >> ../../images.yaml
cd ..
done