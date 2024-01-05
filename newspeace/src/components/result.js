import {React, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/result.css'; // CSS 파일 import
import scrap from '../img/빈책갈피.png';
import scrapcomp from'../img/찬책갈피.png';
import news_1 from '../img/신문배경.png';
import article from '../img/기사배경.png';
import useFormItemStatus from 'antd/es/form/hooks/useFormItemStatus';
import people6 from '../img/null.png';

function Dashboard() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const location = useLocation();
    const responseData = location.state?.responseData;
    const category = location.state?.category;
    const categoryString = Array.isArray(category) ? category.join(', ') : category;
    const navigate = useNavigate();
    const positiveWidth = `${responseData.긍정도}%`; // 긍정 비율
    const negativeWidth = `${responseData.부정도}%`; // 부정 비율
    const [scrapped, setScrapped] = useState({}); // 스크랩 상태 관리 (스크랩 완료 시 이미지 변경)

    const isPositiveHigh = parseFloat(positiveWidth) > 50;
    const isNegativeHigh = parseFloat(negativeWidth) > 50;
    const [loading, setLoading] = useState(false);
    const user_id=window.localStorage.getItem("user_id");

    // 긍정,부정률에 따른 테두리 색 변화
    let positiveBoxShadowClass = '';
    let negativeBoxShadowClass = '';

    if (isPositiveHigh && isNegativeHigh) {
    positiveBoxShadowClass = '';
    negativeBoxShadowClass = '';
    } else if (isPositiveHigh) {  // 긍정 50% 이상
    positiveBoxShadowClass = 'green-shadow';
    negativeBoxShadowClass = '';
    } else if (isNegativeHigh) {  // 부정 50%이상
    positiveBoxShadowClass = '';
    negativeBoxShadowClass = 'red-shadow';
    } else {
    positiveBoxShadowClass = '';
    negativeBoxShadowClass = '';
    }

    // 스크랩 상태 토글 함수
    const toggleScrap = (articleId) => {
        // 사용자 ID 및 뉴스 ID에 액세스할 수 있다고 가정합니다.
        const userId = window.localStorage.getItem('user_id'); // 실제 사용자 ID로 교체하세요.
        const newsId = articleId; // 데이터 구조에 따라 news ID를 조정하세요.

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
      

    return (
        <div className="result_container mx-auto p-4" style={{height:'100%',backgroundImage: `url(${news_1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="flex-1 text-center">     
                {/* <h1 className='Test'> 키워드 : </h1> */}
                <h2 className="text-2xl font-bold mb-4">{responseData.search_keyword}</h2>
                <div className="search-related-keywords">
                    <p>
                    연관 검색어 : {responseData.related_keyword.map((related_keyword, index) => (
                        <span key={index} className="related_keyword" onClick={() => handleKeywordClick(related_keyword)}>
                        {related_keyword}{index < responseData.related_keyword.length - 1 && ' '}
                        </span>
                    ))}
                    </p>
                </div>
                <hr></hr>
                <div className="introduction-text">
                {categoryString ? (
                    <>
                        카테고리 <b>{categoryString}</b>에서의 <b>'{responseData.search_keyword}'</b> 분석 결과입니다.
                    </>
                )
                : (
                    <>
                        <b>'{responseData.search_keyword}'</b> 분석 결과입니다.
                    </>
                )}
                </div>
                <h1 className='Test1'>
                    <span>긍정 의견 (%)</span>
                    <span>부정 의견 (%)</span></h1>
            </div>
            <div className='contents'>
                <div className="mb-4">
                    <div className="bar-container mb-2" style={{ width: '100%' }}>
                        <div className="positive-bar" style={{ width: positiveWidth }}>{positiveWidth}</div>
                        <div className="negative-bar" style={{ width: negativeWidth }}>{negativeWidth}</div>
                    </div>
                </div>
                <div className="list-container md:flex" style={{ width: '100%' }}>
                <div className={`list-box ${positiveBoxShadowClass}`} style={{ width: '100%', backgroundImage: `url(${article})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                    <h3 className="list-title">positive</h3>
                    <p className="article-count">{responseData.article.긍정.length}개</p>
                    <hr />
                    <div className="article-list">
                        {responseData.article.긍정.map((articleData) => (
                            <div className="article-item" key={articleData.id}>
                                <img src={articleData.img || people6} className='article-img' alt="Article" />
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
                <div className={`list-box_ng ${negativeBoxShadowClass}`} style={{ width: '100%', backgroundImage: `url(${article})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <h3 className="list-title">negative</h3>
                    <p className="article-count">{responseData.article.부정.length}개</p>
                    <hr></hr>
                    <div className="article-list">
                        {responseData.article.부정.map((articleData) => (
                            <div className="article-item" key={articleData.id}>
                            <img src={articleData.img || people6} className='article-img' alt="Article"/>
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
                </div>
            </div>
            
        </div>
    );
}

export default Dashboard;