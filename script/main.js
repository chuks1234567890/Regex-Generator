function insert(value, index, array){
      if(index >= array.length){
        let newArr = array;
        newArr.push(value);
        return newArr;
      }
      
      let ndx;
      let newArray = [];
      let inserted = false;
      for(ndx=0; ndx != array.length; ndx++){
        if(ndx == index){
          newArray.push(value);
          inserted = true;
        }else{
          if(inserted == false){
          newArray.push(array[ndx]);
          }else{
            newArray.push(array[ndx-1]);
          }
        }
      }
      
      newArray.push(array[array.length-1]);
      return newArray;
    }
    
    function check_upper_exists(string) {
      var uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toUpperCase();
      for (token of string) {
        if (uppers.includes(token)) {
          return true; //when upper
        }
      }
      
      return false; //no upper
    }
  
    function generate(atr) {
      let string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let numbers = '0123456789';
      let symbols = ',.@#$_&-+()/\\?!;:*\<>~|•√π÷×¶∆}{=°^¥€`¢£"%©®™✓[]';
  
      let value = atr;
      value = value.trim();
      let temp = ' ';
      let sep = [];
  
      for (token of value) {
        
        if (symbols.includes(token)) {
          if (!symbols.includes(temp[temp.length - 1]) && temp != ' ') {
            sep.push(temp);
            temp = '';
          }
          temp += token;
        }
        else if (string.includes(token)) {
          if (!string.includes(temp[temp.length - 1]) && temp != ' ') {
            sep.push(temp);
            temp = '';
          }
          temp += token;
        }
        else if (numbers.includes(token)) {
          if (!numbers.includes(temp[temp.length - 1]) && temp != ' ') {
            sep.push(temp);
            temp = '';
          }
          temp += token;
        }
        
        else{
          temp+=token;
        }
      }
      
      sep.push(temp); //last value
      sep[0] = sep[0].slice(1, sep[0].length+1);
      
      let count = 0;
      while(count < sep.length){
        if(sep[count].includes(' ')){
          sep = insert('\\s', count+1, sep);
          if(count+1 <= sep.length-1){
            sep[count+1] = sep[count+1].trim();
          }
        }
        count++;
      }
      
      //console.log(sep); //See tokenization output in console
      let regex_iter = ['^'];
      for(item of sep){
    
        if(item == '\\s'){
          regex_iter.push(item);
          continue;
        }
        
        if (symbols.includes(item[0])) {
         
          let unix = '(){}[].$+*!?/|^\\-<>';
          let cleaned = '';
          for (i of item) {
            if (unix.includes(i)) {
              let tt = `\\${i}`;
              cleaned += tt;
            } else {
              cleaned += i;
            }
          }
          
          regex_iter.push(cleaned);
        }
        else if(string.includes(item[0])){
          
          if(item.length > 1){
            if(item.toUpperCase() == item){
              regex_iter.push('[A-Z]+');
              continue;
            }
            if(check_upper_exists(item) == true){
              regex_iter.push('[a-zA-Z]+');
            }else{
              regex_iter.push('[a-z]+')
            }
          }else{
            if(item.toUpperCase() == item){
              regex_iter.push('[A-Z]');
              continue;
            } else {
              regex_iter.push('[a-z]');
          }
        }
      } else if(numbers.includes(item[0])){
        item = item.replace(/ /g, '');
        if(item.length > 1){
          let cal = `\\d{${item.length}}`;
          regex_iter.push(cal);
        }else{
          regex_iter.push('\\d');
        }
      }}
      regex_iter.push('$');
      
      let spec_list = ['^'];
      for (item of sep) {
      
        if (item == '\\s') {
          spec_list.push(item);
          continue;
        }
      
        if (symbols.includes(item[0])) {
      
          let unix = '(){}[].$+*!?/|^\\-<>';
          let cleaned = '';
          for (i of item) {
            if (unix.includes(i)) {
              let tt = `\\${i}`;
              cleaned += tt;
            } else {
              cleaned += i;
            }
          }
      
          spec_list.push(cleaned);
        }
        else{
          spec_list.push(item);
        }
      }
      spec_list.push('$');
      
     
      let simi = regex_iter.join('').replace(' ', '');
      
      let spec = spec_list.join('').replace(/ /g, '');
    
      return [simi, spec]; //Final cleaning removing inside spaces
      
    }
    
    
    function copy() {
 
      var copyField = document.querySelector('.repo');
      let copyText = document.createElement('input');
      copyText.value = copyField.innerText;
      copyText.select();
      copyText.setSelectionRange(0, 999999999);
      navigator.clipboard.writeText(copyText.value);
      let alertCopy = document.querySelector('#copy-alert');
      alertCopy.style.visibility = 'visible';
      alertCopy.innerHTML = `Copied ${copyText.value.slice(0, 20)}...`;
  
      let timeout = setTimeout(
        function () {
            document.querySelector('#copy-alert').style.visibility = 'hidden';
        }, 2000);
}

    //DOM Part
   document.querySelector('#btn').onclick = function(){
     let field = document.querySelector('#field').value;
     if(field == ''){
       document.querySelector('.error'). style.visibility = 'visible';
     }else{
       
       document.querySelector('.error'). style.visibility = 'hidden';
     let regex = generate(field);
     document.querySelector('.repo').innerText = regex[0];
     document.querySelector('.spec-reg').innerText = regex[1];
     document.querySelector('#pattern').innerText = `'${regex[0]}'`
     document.querySelector('#text').innerText = `'${field}'`;
     }
   }
   
   document.querySelector('#cancel').onclick = function(){
     document.querySelector('.error'). style.visibility = 'hidden';
   }
   
   let theme = true;
   document.querySelector('.nav-btn').onclick = function () {
     if(theme == true){
       document.querySelector('body').style.backgroundColor = '#213142';
       this.style.backgroundColor = '#CFB2FA';
       this.style.boxShadow = '4px 4px #FACD3A';
       this.innerText = '🌚';
       theme = false;
     }else{
       document.querySelector('body').style.backgroundColor = '#FFFBEF';
       this.innerText = '🌝';
       this.style.backgroundColor = '#FACD3A';
       this.style.boxShadow = '4px 4px #CFB2FA';
       theme = true;
     }
   }
   
   document.querySelector('#clear').onclick = function () {
     document.querySelector('.repo').innerText = '';
     document.querySelector('#field').value = '';
     document.querySelector('.spec-reg').innerText = '........'
   }
   
   document.querySelector('.js').onclick = function () {
     let text = document.querySelector('#field').value;
     let repo = document.querySelector('.repo').innerText;
     
     let js_code = `
         <code>
              <pre>
  1  <span class="var">let</span> text <span class="eq">=</span> <span class="qu" id="text">'${text}'</span>;
              </pre>
              <pre>
  2  <span class="var">let</span> pattern <span class="eq">=</span> new <span class="imp">RegExp</span>(<span class="qu" id="pattern">'${repo}'</span>);
              </pre>
              <pre>
  3  <span class="var">let</span> find_ndx <span class="eq">=</span> <span class="imp">text</span><span class="white">.</span><span class="var">search</span><span class="mod">(</span><span class="white">pattern</span><span class='mod'>)</span>;
              </pre>
              <pre>
  4  <span class="print">console.log</span><span class="mod">(</span> <span class="white">find_ndx</span> <span class="mod">)</span>
              </pre>
            </code>
        `;
     document.querySelector('.code-snip').innerHTML = js_code;
   }
   document.querySelector('.py').onclick = function() {
     let text = document.querySelector('#field').value;
     let repo = document.querySelector('.repo').innerText;
     
     let py_code = `
         <code>
              <pre>
  1  <span class="imp">import</span> <span class="mod">re</span>
              </pre>
              <pre>
  2  <span class="var">text</span> <span class="eq">=</span> <span class="qu" id="text">'${text}'</span>
              </pre>
              <pre>
  3  <span class="var">pattern</span> <span class="eq">=</span> <span class="imp">r</span><span class="qu" id="pattern">'${repo}'</span>
              </pre>
              <pre>
  4  <span class="var">find_all</span> <span class="eq">=</span> <span class="imp">re</span><span class="white">.</span><span class="var">findall</span><span class="mod">(</span><span class="white">pattern</span><span class="imp">,</span> <span class="white">text</span><span class="mod">)</span>
              </pre>
              <pre>
  5  <span class="print">print</span><span class="mod">(</span> <span class="white">find_all</span> <span class="mod">)</span>
              </pre>
            </code>
        `;
     document.querySelector('.code-snip').innerHTML = py_code;
   }