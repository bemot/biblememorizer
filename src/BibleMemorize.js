import React, { Component } from 'react';
import data from "./BIBLES/kjogrs.json";
import objectHash from "object-hash";
import { DropdownList } from 'react-widgets';
import { Multiselect } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';

function filterData(cur_bible)
{
    var index = 1;
    var b = {};
    if (cur_bible.name == "King James" ) {index = 0};
    if (cur_bible.name == "Ukrainian Ogienko" ) {index = 1};
    if (cur_bible.name == "Russian Synodal" ) {index = 2};
        b = data.bibles[index];
    //   console.log('cur_bible name '+ cur_bible.name)
    //    console.log(b);
    return b;
  }

function compareHashes(hash1,hash2) {
    //console.log(hash1);
    //console.log(hash2);
        if (hash1===hash2)
        return true
        else
        return false
}

function makeIndex(len) {

  let s = '';
    while (s.length < len) s += Math.random().toString(36).substr(2, len - s.length);
    //console.log(s);
  return s;
}
//////////////////////////////////////////////////////////////////////////////////////
function ActiveBook(props) {

    var knygy = []

    // var book_id = 0
    //var book_name =''
    console.log(props.bible);
    for (var i=0; i < props.bible.books.length;i++) {
        knygy.push(
            {book_id: i,
             book_name: props.bible.books[i].name
            }
        )
    }

    // console.log(chaps)
    return(
        <div>
            <DropdownList
                data = {knygy}
                valueField='book_id'
                textField= 'book_name'
                defaultValue={knygy[0].book_name}
                onChange= {props.onChange}


            />

        </div>

    )
}

function ShowCurentBible(props) {
    //console.log(props.cur_bible);
    filterData(props.cur_bible);
    return(
        <div>
            Current bible:
            <br />
            {props.cur_bible.name}
        </div>

    )
}

//////////////////////////////////////////////////////////////////////////////////
//
function ActiveChapter(props) {

    var rosdily = []

    console.log(props.bible);
    console.log(props.book_num)
    for (var i=0; i< props.bible.books[props.book_num].chapters.length;i++) {
        rosdily.push(
            {chapter_id: i,
             chapter_name: props.bible.books[props.book_num].chapters[i].name
            }
        )
    }

    // console.log(chaps)
    return(
        <div>
            <DropdownList
                data = {rosdily}
                valueField='chapter_id'
                textField= 'chapter_name'
                defaultValue={rosdily[0].chapter_name}
                onChange= {props.onChange}


            />

        </div>

    )
}

///////////////////////////////////////////////////////////////////////////////////
//
 function ActiveVerse(props) {

     var virshi = [];

     console.log(props.bible);
     console.log(props.chap_num)
     console.log(props.value)
     for (var i=0; i < props.bible.books[props.book_num].chapters[props.chap_num].verses.length;i++) {
        virshi.push(
            {verse_id: i+1,
             verse_name: props.bible.books[props.book_num].chapters[props.chap_num].verses[i].name
            }
        )
    }

    // console.log(chaps)
    return(
        <div>
            <Multiselect
                data = {virshi}
                valueField='verse_id'
                textField='verse_id'
                onChange={props.onChange}
                defaultValue={[1]}


            />

        </div>

    )
}



//////////////////////////////////////////////////////////////////////////////////
function ActiveWords (props) {
      return (
          <div className="container">
              <h4>Right Bible text</h4>
          <ul>
            {props.list.map((bible_words) => (
              <li key={bible_words.index}>
                <button id="deactivate_button" onClick={() =>
                        props.onToggleWord(bible_words.index,bible_words.chunk_of_words)}>
                        {bible_words.chunk_of_words}</button>
              </li>
            ))}
          </ul>
        </div>
      )
} //end ActiveWords


function InactiveWords (props) {
      return (
          <div className="container">
              <h4>Wrong Bible text</h4>
          <ul>
            {props.list.map((bible_words) => (
              <li key={bible_words.index}>


                <button id="activate_button" onClick={() =>
                        props.onToggleWord(bible_words.index,bible_words.chunk_of_words)}>
                        {bible_words.chunk_of_words}
                    </button>
              </li>
            ))}
          </ul>
        </div>
      )
}//end InactiveWords


   class VerseMemorize extends Component {
       constructor(props) {
        super(props)
          this.state = {
            bible: data.bibles[1],
            bookNumber: 0,
            chapterNumber: 0,
            verseNumber: 0,
            current_bible : {name:'Ukrainian Ogienko'},
            value_main: '',
            verse: 'На початку Бог створив Небо та землю.',
            bible_words: [],
            text_hash: objectHash.sha1(''),
            main_hash: objectHash.sha1(''),
        }
        //binds here
        //console.log(this.state.current_bible)

        this.updateInput_text = this.updateInput_text.bind(this)
        this.updateInput_main = this.updateInput_main.bind(this)
        this.handleAddAllWords = this.handleAddAllWords.bind(this);
        this.handleToggleWord_to_active = this.handleToggleWord_to_active.bind(this)
        this.handleToggleWord_from_active = this.handleToggleWord_from_active.bind(this)
        this.handleRemoveWord = this.handleRemoveWord.bind(this)
        this.handleChangeBCW = this.handleChangeBCW.bind(this)
        this. handleChangeBCVirshi = this.handleChangeBCVirshi.bind(this)


     }//end constructor

       // all handlers here
       //

       componentDidMount () {
        }

    async   shouldComponentUpdate(prevProps){
        //console.log(prevProps.bible);
        // console.log('shouldComponentUpdate');
       }

    async   componentWillReceiveProps(prevProps){
        //console.log(prevProps.bible);
        // console.log('shouldComponentUpdate');
      if (this.state.current_bible !== prevProps) {
       await  this.setState({
           current_bible: prevProps.bible,
           bible: filterData(prevProps.bible)
          })
      }
    }


/////////////////////////////////////////////////////////////////////////////////////
   async handleChangeBCW(bk,ch,vr) {
    await this.setState((currentState) => {
      return {

              bookNumber: bk,
              chapterNumber: ch,
              verseNumber: vr,
              verse: this.state.bible.books[bk].chapters[ch].verses[vr].text,
              text_hash: objectHash.sha1(this.state.bible.books[bk].chapters[ch].verses[vr].text),


          }
     })
   }


  async handleChangeBCVirshi(bk,ch,value) {
      let virsh ='';
      var i =0;
      //console.log(value);
      for (; i < value.length;i++) {
          //console.log(i)
          virsh += this.state.bible.books[bk].chapters[ch].verses[value[i].verse_id-1].text + ' '
          //console.log(virsh)
        }
      await this.setState((currentState) => {
        return {
             bookNumber: bk,
             chapterNumber: ch,
             verse: virsh,
             text_hash: objectHash.sha1(virsh),

            }

          }
     )
   }


/////////////////////////////////////////////////////////////////////////////////////
    async handleAddAllWords() {
        var i=0;
        let BW_array = [];
        let array2 = [];
        ///(/.*?[.)\s]+?/g)
        BW_array = await this.state.verse.match(/(\*?.{1,28})(?:\s+|$)/g);
        //console.log(BW_array);
        while(BW_array.length !== 0) {
            let randomIndex=Math.floor(Math.random() * BW_array.length);
            array2.push(BW_array[randomIndex]);
            BW_array.splice(randomIndex,1);
        }
        BW_array = array2;
      //console.log(BW_array);

       // console.log(BW_array);

        do {

        this.setState((currentState) => {

          return {
            bible_words: currentState.bible_words.concat([{
            chunk_of_words: BW_array[i],
            index: makeIndex(10),
            active: false,
            text_hash: objectHash.sha1(this.state.verse),
            main_hash: objectHash.sha1(''),
           }])
          }

        })
        i++;
       }
       while (i < BW_array.length);
  } //end handleAddAllWords


//////////////////////////////////////////////////////////////////////////////////////
      handleRemoveWord(index) {
        this.setState((currentState) => {
          return {
            bible_words: currentState.bible_words.filter((bible_words) => bible_words.index !== index)
          }
        })
      }


//////////////////////////////////////////////////////////////////////////////////////
    handleToggleWord_to_active(index,chunk_of_words) {
        this.setState((currentState) => {
          const bible_words = currentState.bible_words.find((bible_word) => bible_word.index === index);
          const hash_string = objectHash.sha1(this.state.value_main + chunk_of_words);
        if (compareHashes(hash_string,this.state.text_hash)) {
            alert('You are genius!!!')
        }
          return {
            value_main: this.state.value_main + chunk_of_words,
            main_hash:  hash_string,
            bible_words: currentState.bible_words.filter((bible_word) => bible_word.index !== index)
              .concat([{
                index,
                chunk_of_words,
                active: !bible_words.active
              }])
          }
        })
      }


////////////////////////////////////////////////////////////////////////////////////////
    handleToggleWord_from_active(index,chunk_of_words) {
        this.setState((currentState) => {
          const bible_words = currentState.bible_words.find((bible_word) => bible_word.index === index)

          return {
              bible_words: currentState.bible_words.filter((bible_word) => bible_word.index !== index)
              .concat([{
                index,
                chunk_of_words,
                active: !bible_words.active
              }])
          }
        })
      }


////////////////////////////////////////////////////////////////////////////////////////
async   updateInput_text(e) {
      //console.log(e.target.value)
      const verse = e.target.value
     await  this.setState({
          verse: verse,
          text_hash: objectHash.sha1(verse),
        })
     }

////////////////////////////////////////////////////////////////////////////////////////
    updateInput_main(e) {
         const value_main = e.target.value
         const new_hash =  objectHash.sha1(this.state.value_main);

       // console.log(value_main)
       // console.log('new_hash', new_hash);
       // console.log('text hash', this.state.text_hash);

       if (compareHashes(new_hash,this.state.text_hash)) {
            alert('You are genius!!!')
         }
        this.setState({
          value_main: value_main,
          main_hash: objectHash.sha1(value_main),
        })

     }
///////////////////////////////////////////////////////////////////////////////////////
       render() {
           return (

         <div>
        <div className="container">
        <div className="col-sm-4">

     <div><ActiveBook
             bible={this.state.bible}
                    onChange={(value) => {
                        this.handleChangeBCW(value.book_id,0,0)}
                    }
              /></div>
    </div>

    <div className="col-sm-4">
        <div><ActiveChapter
              bible={this.state.bible}
              book_num={this.state.bookNumber}
              onChange={(value) => {
                        this.handleChangeBCW(this.state.bookNumber,value.chapter_id,0)}
              }
          />
         </div>
    </div>

    <div className="col-sm-4">
       <div><ActiveVerse
              bible={this.state.bible}
              book_num={this.state.bookNumber}
              chap_num={this.state.chapterNumber}
              onChange={(value) => {
                  //console.log(value)
                this.handleChangeBCVirshi(this.state.bookNumber,this.state.chapterNumber,value)}
              }
          />
      </div>
    </div>

    <div className="container">
        <div className="form-group">
                <textarea className="form-control rounded-10" id="bible_text" rows="4"
            value={this.state.verse}
                  onChange={this.updateInput_text}
              />
             <div id="label_texthash">  {this.state.text_hash} </div>


         <div className="btn-group">
           <div>
                 <button  type="button" className="btn btn-primary btn-sm"
                                            onClick={this.handleAddAllWords}>
                       /divide the verse/
                  </button>
            </div>
           <div>
               <button type="button" className="btn btn-primary btn-sm"
                            onClick={() => this.setState({
                bible_words: [],
                value_main: '',
                main_hash: objectHash.sha1(''),})}>
                            /clear/
                </button>
            </div>
           </div>


          </div>


        <div className="form-group">
                <textarea className="form-control rounded-10" id="main_text" rows="4"
                    value ={this.state.value_main}
                        onChange={this.updateInput_main}
                />
             <div id="label_mainhash">  {this.state.main_hash} </div>


      </div>
  </div>

            <div>
              <InactiveWords
                list={this.state.bible_words.filter((bible_words) => bible_words.active === false)}
                onToggleWord={this.handleToggleWord_to_active}

            />
            </div>



            <div>
              <ActiveWords
                list={this.state.bible_words.filter((bible_words) => bible_words.active === true)}
                onRemoveWord={this.handleRemoveWord}
                onToggleWord={this.handleToggleWord_from_active}

            />
            </div>

        </div>

    </div>

       );
    }

}

export default VerseMemorize;
