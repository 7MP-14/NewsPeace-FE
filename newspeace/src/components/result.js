import {React, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/result.css'; // CSS 파일 import
import scrap from '../img/빈책갈피.png';
import scrapcomp from'../img/찬책갈피.png';
import useFormItemStatus from 'antd/es/form/hooks/useFormItemStatus';
import null_img from '../img/kpilogo.png';

function Dashboard() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const location = useLocation();
    const responseData = location.state?.responseData;
    const category = location.state?.category;
    const categoryString = Array.isArray(category) ? category.join(', ') : category;
    const navigate = useNavigate();
    console.log(responseData);
    const positiveWidth = `${responseData.긍정도}%`; // 긍정 비율
    const negativeWidth = `${responseData.부정도}%`; // 부정 비율
    const neutralWidth = `${responseData.중립도}%`; // 중립 비율

    // 기사별 리스트

    const [showPositive, setShowPositive] = useState(false);
    const [showNegative, setShowNegative] = useState(false);
    const [showNeturl, setShowNeturl] = useState(false);

    const handleTogglePositive = () => {
        setShowPositive(!showPositive);
        setShowNegative(false);
        setShowNeturl(false);
      };
      
      const handleToggleNegative = () => {
        setShowPositive(false);
        setShowNegative(!showNegative);
        setShowNeturl(false);
      };
      
      const handleToggleNeturl = () => {
        setShowPositive(false);
        setShowNegative(false);
        setShowNeturl(!showNeturl);
      };
    
      ///////////////////


    const [scrapped, setScrapped] = useState({}); // 스크랩 상태 관리 (스크랩 완료 시 이미지 변경)

    const isPositiveHigh = parseFloat(positiveWidth) > parseFloat(negativeWidth);
    const isNegativeHigh = parseFloat(negativeWidth) > parseFloat(positiveWidth);
    const [loading, setLoading] = useState(false);
    const user_id=window.localStorage.getItem("user_id");

    const [checkedItems, setCheckedItems] = useState([]);
    const [inputkeyword, setinputKeyword] = useState('');

    // 긍정,부정률에 따른 테두리 색 변화
    let positiveBoxShadowClass = '';
    let negativeBoxShadowClass = '';
    let neutralBoxShadowClass = '';

   if (isPositiveHigh && isNegativeHigh && parseFloat(neutralWidth) > Math.max(parseFloat(positiveWidth), parseFloat(negativeWidth))) {
    positiveBoxShadowClass = '';
    negativeBoxShadowClass = '';
    neutralBoxShadowClass = 'blue-shadow';
} else {
    neutralBoxShadowClass = '';
}

    // 스크랩 상태 토글 함수
    const toggleScrap = (articleId) => {
        const userId = window.localStorage.getItem('user_id'); // 실제 사용자 ID로 교체하세요.
        const newsId = articleId;

        // 상태를 업데이트합니다.
        setScrapped((prev) => ({ ...prev, [articleId]: !prev[articleId] }));

        // 백엔드로 fetch 요청을 보냅니다.
        // 'your-backend-api-endpoint'를 실제 엔드포인트로 교체하세요.
        fetch(`${apiUrl}/news/newsscript/`, {
            method: 'POST', // 백엔드 API 요구 사항에 따라 메서드를 조정하세요.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                newsId: newsId,
            }),
        })
            .then((response) => {
                // 필요한 경우 응답을 처리합니다.
                if (!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다');
                }
                return response.json();
            })
            .then((data) => {
                // 필요한 경우 백엔드에서 받은 데이터를 처리합니다.
                console.log(data.return);
            
                if (data.return === "스크립트 한 뉴스입니다.") {
                    // 알림 표시
                    window.alert('이미 스크랩한 뉴스입니다.');
                } else {
                    // 스크립트 성공 알림 표시
                    window.alert('스크랩에 성공했습니다.');
                }
            })
            .catch((error) => {
                // 여기에서 에러를 처리합니다.
                console.error('에러:', error);
            });
    };
    const MAX_TITLE_LENGTH=34;
    function truncateTitle(title) {
        if (title.length > MAX_TITLE_LENGTH) {
          return title.substring(0, MAX_TITLE_LENGTH) + '...';
        }
        return title;
      }

const handleKeywordClick = (clickedKeyword) => {
    setLoading(true);
    fetch(`${apiUrl}/news/search/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
        keyword: clickedKeyword,
        }),
    })
        .then(res => res.json())
        .then(res => {
        if (res.reply === false) {
            setLoading(false);

            // 결과가 없는 경우
            window.alert('해당하는 검색어에 대한 결과가 없습니다.');
        } else {
            // 결과가 있는 경우 페이지 이동
            navigate('/result', { state: { responseData: res} });
        }
        })
        .catch(error => {
        setLoading(false);
        console.error('에러:', error);
        });
      };
      
      const submit=()=>{
        if (!inputkeyword.trim()) {
          window.alert('검색어를 입력해주세요.');
          return;
        }
        setLoading(true);
      
        fetch(`${apiUrl}/news/search/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            keyword: inputkeyword,
            category: checkedItems,
          }),
        })
        .then(res => res.json())
        .then(res => {
          setLoading(false);
    
          if (res.reply === false) {
            // 결과가 없는 경우
            window.alert('해당하는 검색어에 대한 결과가 없습니다.');
            setinputKeyword("");
          } else {
            // 결과가 있는 경우 페이지 이동
            navigate('/result', { state: { responseData: res, category: checkedItems } });
          }
        })
        .catch(error => {
          setLoading(false);
          console.error('에러:', error);
        });
      }

      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          submit(); 
        }
      };
      const handleKeywordChange = (event) => {
        setinputKeyword(event.target.value);
      };
    return (
        <div className="result_container mx-auto p-4" style={{height:'100%', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="flex-1 text-center">     
                {/* <h1 className='Test'> 키워드 : </h1> */}
                
                <div className="introduction-text" style={{marginTop:'1rem', marginBottom:'2.5rem'}}>
                {categoryString ? (
                    <>
                        카테고리 <b>{categoryString}</b>에서의 <b>'{responseData.search_keyword}'</b> 분석 결과입니다.
                    </>
                )
                : (
                    <>
                        <h4><b>'{responseData.search_keyword}'</b> 분석 결과입니다.</h4>
                    </>
                )}
                </div>
            </div>
            <div className='contents'>
                <div className="mb-4">
                    <div className="bar-container mb-2" style={{ width: '100%'}}>
                        <div className='box'>
                            <div className="neutral-bar" style={{ width: neutralWidth }}> 중립 {neutralWidth}</div>
                            <div className="positive-bar" style={{ width: positiveWidth }}> 긍정 {positiveWidth}</div>
                            <div className="negative-bar" style={{ width: negativeWidth }}> 부정 {negativeWidth}</div>
                        </div>
                    </div>
                </div>


                <div className='npn-info'>

                    <div className='npn-search'>
                        <div className='npn'>
                            <span onClick={handleToggleNeturl} style={{ cursor: 'pointer', fontWeight: showNeturl ? 'bold' : 'normal' }}>Neturl</span> · 
                            <span onClick={handleTogglePositive} style={{ cursor: 'pointer', fontWeight: showPositive ? 'bold' : 'normal' }}>Positive</span> · 
                            <span onClick={handleToggleNegative} style={{ cursor: 'pointer', fontWeight: showNegative ? 'bold' : 'normal' }}>Negative</span>

                        </div>

                        <div className="search-related-keywords" style={{width:'50%'}}>
                            <span>연관 검색어 {responseData.related_keyword.map((related_keyword, index) => (
                                <span key={index} className="related_keyword" onClick={() => handleKeywordClick(related_keyword)}>
                                {related_keyword}{index < responseData.related_keyword.length - 1 && ''}
                                </span>
                            ))}
                            </span>
                        </div>
                    </div>

                    <hr></hr>

                    <div className='npn-content'>
                        {showNeturl && (
                            <div className={`list-box ${neutralBoxShadowClass}`} style={{ width: '100%', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                                
                                <p className="article-count">{responseData.article.중립.length}개</p>
                                  
                                    <div className="article-list">
                                        {responseData.article.중립.slice().reverse().map((articleData) => (
                                            <div className="article-item" key={articleData.id}>
                                                <img src={articleData.img || null_img} className='article-img' alt="Article" />
                                                <div className="article-content">
                                                <a href={articleData.link} className="article-link">{truncateTitle(articleData.title)}</a>
                                                <p className="write-dt">
                                                    {articleData.write_dt.split('T')[0]} {((articleData.write_dt.split('T')[1]).split('.')[0]).split(':')[0]}:{((articleData.write_dt.split('T')[1]).split('.')[0]).split(':')[1]}</p>
                                                        </div>
                                                        {user_id && (
                                                        <button className="scrap-button" onClick={() => toggleScrap(articleData.id)}>
                                                        <img src={scrapped[articleData.id] ? scrapcomp : scrap} style={{ width: '20px', height: '20px' }} alt="Scrap" />
                                                    </button>
                                                )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {showPositive && (
                            <div className={`list-box ${positiveBoxShadowClass}`} style={{ width: '100%', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                            
                            <p className="article-count">{responseData.article.긍정.length}개</p>
                        
                            <div className="article-list">
                                {responseData.article.긍정.slice().reverse().map((articleData) => (
                                    <div className="article-item" key={articleData.id}>
                                        <img src={articleData.img || null_img} className='article-img' alt="Article" />
                                        <div className="article-content">
                                            <a href={articleData.link} className="article-link">{articleData.title}</a>
                                            <p className="write-dt">
                                            <p className="write-dt">
                                                {articleData.write_dt.split('T')[0]} {((articleData.write_dt.split('T')[1]).split('.')[0]).split(':')[0]}:{((articleData.write_dt.split('T')[1]).split('.')[0]).split(':')[1]}</p>
                                            </p>
                                        </div>
                                        {user_id && (
                                            <button className="scrap-button" onClick={() => toggleScrap(articleData.id)}>
                                                <img src={scrapped[articleData.id] ? scrapcomp : scrap} style={{ width: '20px', height: '20px' }} alt="Scrap" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        )}
                        
                        {showNegative && (
                            <div className={`list-box_ng ${negativeBoxShadowClass}`} style={{ width: '100%', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                
                                <p className="article-count">{responseData.article.부정.length}개</p>

                                <div className="article-list">
                                    {responseData.article.부정.slice().reverse().map((articleData) => (
                                        <div className="article-item" key={articleData.id}>
                                        <img src={articleData.img || null_img} className='article-img' alt="Article"/>
                                        <div className="article-content">
                                            <a href={articleData.link} className="article-link">{articleData.title}</a>
                                            <p className="write-dt">{articleData.write_dt.split('T')[0]} {((articleData.write_dt.split('T')[1]).split('.')[0]).split(':')[0]}:{((articleData.write_dt.split('T')[1]).split('.')[0]).split(':')[1]}</p>
                                        </div>
                                            {user_id && (
                                                <button className="scrap-button" onClick={() => toggleScrap(articleData.id)}>
                                                    <img src={scrapped[articleData.id] ? scrapcomp : scrap} style={{ width: '20px', height: '20px' }} alt="Scrap" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>


            </div>
        </div>
    );
}

export default Dashboard;