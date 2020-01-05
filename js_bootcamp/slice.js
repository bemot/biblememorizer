<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Merge Array Words</title>
  </head>
  <body>


    <script type="text/javascript">
    let text='На початку Бог сотрворив Небо і землю, земля була. (Буття 1:1)'
    let ar1=[];
       ar1=text.match(/.*?[\.\)\s]+?/g)
    console.log(ar1);
    let ar2=[];
    let i = 0;
    for (;i<ar1.length;i++) {
        if ((i+1) % 2 === 0) {
            ar2 = ar2 + ar1.slice(i-1,i+1);

        }
    }

    console.log(ar2);
</script>

  </body>
</html>

