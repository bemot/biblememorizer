import React, { Component } from 'react';
import data from "./BIBLES/kjogrs.json";
import objectHash from "object-hash";
import { DropdownList } from 'react-widgets';
import { Multiselect } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


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
    return(
        <div>
            Current bible
            <br />
            {props.cur_bible.bible}
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
     for (var i=0; i < props.bible.bibles.books[props.book_num].chapters[props.chap_num].verses.length;i++) {
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


///////////////////////////////////////////////////////////////////////////////////
//////// NOT USING IT NOW ////////
////////////////////////////////////////////////////
function ActiveBible (props) {
    const bibles = [{bible:'Ukrainian Ogienko'},
                    {bible:'King James'},
                    {bible:'Rusian Synodal'}];
     //let alertWhenChanged = () => console.log('from activeBible');
     return (
        <div>
            <DropdownList
                data = {bibles}
                valueField='bible'
                textField= 'bible'
                defaultValue= {bibles[0].bible}
                onChange = {props.onChange}
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
              //bible: data ,
            bookNumber: 0,
            chapterNumber: 0,
            verseNumber: 0,
            current_bible : {},
            value_main: '',
            verse: '',
              //bible_words: [],
              //text_hash: objectHash.sha1(wholeVerse),
              //main_hash: objectHash.sha1(''),
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
        this.handleChangeBCVirshi = this.handleChangeBCVirshi.bind(this)


     }//end constructor

       // all handlers here
       //

       componentDidMount () {
        console.log('BM did mount...')

        console.log(this.state.current_bible)
           //this.setState.current_bible=this.state.current_bible;
       }

       componentDidUpdate(prevProps,prevState,nextProps,nextState) {

        console.log('BM did..');
        console.log('prevProps ', prevProps);
        console.log('prevState ', prevState);
        console.log('nextProps ', nextProps);
        console.log('nextState ', nextState);
        this.setState.current_bible=prevProps.value;
    // Typical usage (don't forget to compare props):
    //if (this.props.userIiD !== prevProps.userID) {
    // this.fetchData(this.props.userID);
        }

       shouldComponentUpdate(prevProps){
               console.log('shouldComponentUpdate');
               if (this.state.current_bible !== prevProps.value) {
                   return true}
                else return false
               }



/////////////////////////////////////////////////////////////////////////////////////
   async handleChangeBCW(bk,ch,vr) {
    await this.setState((currentState) => {
      return {

              bookNumber: bk,
              chapterNumber: ch,
              verseNumber: vr,
              verse: data.books[bk].chapters[ch].verses[vr].text,
              text_hash: objectHash.sha1(data.books[bk].chapters[ch].verses[vr].text),


          }
     })
   }


  async handleChangeBCVirshi(bk,ch,value) {
      let virsh ='';
      var i =0;
      //console.log(value);
      for (; i < value.length;i++) {
          //console.log(i)
          virsh += data.books[bk].chapters[ch].verses[value[i].verse_id-1].text + ' '
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
            <ShowCurentBible cur_bible = {this.state.current_bible}/>
        </div>
      </div>

       );
    }

}

export default VerseMemorize;
