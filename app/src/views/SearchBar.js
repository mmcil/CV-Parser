import React, {useState} from 'react';

const SearchBar = () => {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        alert(search);
        /*let communityName = this.state['selectedCommunity'];
        let files = this.state[files];

        fetch(clientConfiguration['filesApi.local'], {
            method: 'POST',
            headers: new Headers(),
            body: JSON.stringify({communityName: communityName, body: files})
        }).then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))*/
    }

    return (
        <form action="/" method="get">
            <label htmlFor="header-search">
            </label>
            <input
                onChange={event => setSearch(event.target.value)}
                type="text"
                id="header-search"
                name="s"
            />
            <button onClick={handleSearch} type="submit">Ara</button>
        </form>
    );
}

export default SearchBar;