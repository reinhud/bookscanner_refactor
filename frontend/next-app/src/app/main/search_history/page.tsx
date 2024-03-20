'use client';

import BookCard from '@/components/cards/book_card';
import PageHeader from '@/components/header/page_header';
import useAPI from '@/hooks/requests/api';
import UserRequest from '@/requests/user_requests';
import BookType from '@/types/book_type';
import { useEffect, useState } from 'react';

const userRequest = new UserRequest();

export default function SearchHistory() {
    const [{ response, isLoading, isError, errorMessage }, setRequestConfig] = useAPI(null, null);
    const [serverErrorMessage, setServerErrorMessage] = useState<string>('');

    useEffect(() => {
        setServerErrorMessage(''); // Clear any previous server error message
        // Set request configuration to get search history books
        setRequestConfig(userRequest.history());
    }, [setRequestConfig]); 

    useEffect(() => {
        if (errorMessage) {
            setServerErrorMessage(errorMessage);
        }
    }, [errorMessage]);

    return (
        <main>
            {/* Display the page header with the title "Search History" */}
            <PageHeader title="Search History" />
            <div className="search-history-page">
                {/* Display loading message while data is being fetched */}
                {isLoading && <p>Loading...</p>}
                {/* Display error message if an error occurred during API request */}
                {isError && <p>{serverErrorMessage || 'Error occurred.'}</p>}
                {/* Map through the response data and display book cards */}
                {response &&
                    response.data &&
                    response.data.map((book: BookType, index: any) => (
                        <BookCard key={index} book={book} />
                    ))}
            </div>
        </main>
    );
}