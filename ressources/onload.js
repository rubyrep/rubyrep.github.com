function myinit() {
  highlightCurrentPageLink();
  buildTOC();
}

function highlightCurrentPageLink() {
  //scan links only within the Menu container, the Table with ID header
  if (document.getElementById('menu').getElementsByTagName('a')) 
  {
    var link;
    for (var i = 0; (link = document.getElementById('menu').getElementsByTagName('a')[i]); i++)
    {
      if (link.href == location.href)
      {
        document.getElementById('menu').getElementsByTagName('li')[i].id = 'current';
        //document.getElementById('menu').getElementsByTagName('a')[i].removeAttribute('href');
        //header.getElementsByTagName('a')[i].setAttribute('title', 'this is the tool tip');
      }
    }
  }
}

var stateTOC = 'OFF';
function toggleTOC() {
  if (stateTOC == 'ON') {
    stateTOC = 'OFF'
    document.getElementById('TOC').style.display = "none";
  }
  else {
    stateTOC = 'ON'
    document.getElementById('TOC').style.display = "inline";
  }
}

function buildTOC() {
  /***************************************/
  /* Get desired tags and store in array */
  /***************************************/
  /* Define list of tags to include in toc
  Each valid tag must be bounded by spaces to satisfy the test below.
  The beginning & end '.'s merely stop leading &
  trailing whitespaces being removed.*/
  validTagList = '. H2 .';
  
  // Get list of all tags & store in array.
  allTags = getObjects();

  var tagDetail = new Array(1);
  j = 0;
  aNum = 0;
  for(i = 0; i < allTags.length; i++) {
    if (validTagList.indexOf(' '+allTags[i].tagName+' ') > 0) {
      // Add an anchor as a child to the tag so that toc link to it
      aNum = aNum + 1;
      var aNode = document.createElement("A");
      aNode.id = 'Z'+aNum;
      allTags[i].appendChild(aNode);

      // Keep relevant data fron the tag to use in toc separated by "|".
      // ....the name of the tag (eg. H3)
      tagDetail[j] = allTags[i].tagName + "|";

      // ....the anchor number we have assigned
      tagDetail[j] = tagDetail[j]+aNum + "|";

      // ....the text of the tag
      if (allTags[i].childNodes.length > 0) {
	str = allTags[i].childNodes[0].nodeValue;
	if (str == null) str = allTags[i].childNodes[0].innerHTML;
        tagDetail[j] = tagDetail[j] + str
      }
      ;
      j = j + 1;
    }
  }

  /***************************************/
  /*Build toc                            */
  /***************************************/
  var ulNode = document.createElement('UL');
  ulNode.className = 'sidemenu'
  tocId = document.getElementById('TOC');
  tocId.appendChild(ulNode);

  for(i = 0; i < tagDetail.length; i++) {
    thisDetail = tagDetail[i].split("|");

    var liNode = document.createElement("LI");
    liNode.className = thisDetail[0];
    ulNode.appendChild(liNode);

    var aNode = document.createElement("A");
    aNode.className = thisDetail[0];
    aNode.href = '#Z'+thisDetail[1];
    liNode.appendChild(aNode);
    aNode.innerHTML = thisDetail[2];

    // alert('i='+i + ' tagName='+aNode.tagName + ' href='+aNode.href + ' className='+aNode.className + ' text='+aNode.innerText);

  }
  
  if (tagDetail.length > 1) {
    toggleTOC();
  }
}

function getObjects() {
  var obj = new Array(1);
  j = 0;
  obj[j] = document.getElementById('main');
  traverse( document.getElementById('main') );

  function traverse(node) {
    obj[j] = node;
    j = j + 1;
    if (node.childNodes != null) {
      for (var i=0; i < node.childNodes.length; i++) {
        traverse(node.childNodes.item(i));
      }
    }
  }
  return obj;
}
