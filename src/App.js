import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { ThemeProvider } from "../src/context/ThemeContext";
import { LocaleProvider } from "./context/LocaleContext";
import Navigation from "./component/Navigation";
import { putAccessToken,getUserLogged } from "./utils/network-data";
import HomePage from "./pages/HomePage";
import ArchivedPage from "./pages/ArchivedPage";
import DetailPage from "./pages/DetailPage";
import AddNotePage from "./pages/AddNotePage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Preloader from "./component/Preloader";

function AppWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const urlTitle = searchParams.get("title");

    function changeUrlTitle(title) {
        setSearchParams({title});
    }
    return <App urlTitle={urlTitle} changeUrlTitle={changeUrlTitle}/>
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authedUser: null,
            initializing: true,
            search: props.urlTitle || "",
            themeState: {
                theme: localStorage.getItem('theme') || 'dark',
                toggleTheme: () => {
                    this.setState((prevState) => {
                        const newTheme = prevState.themeState.theme === 'light' ? 'dark' : 'light';
                        localStorage.setItem('theme', newTheme);
                        return {
                            themeState: {
                                ...prevState.themeState,
                                theme: newTheme
                            }
                            
                        };
                    });

                }
            },
            localeContext: {
                locale: localStorage.getItem('locale') || 'id',
                toggleLocale: () => {
                  this.setState((prevState) => {
                    const newLocale = prevState.localeContext.locale === 'id' ? 'en' : 'id';
                    localStorage.setItem('locale', newLocale);
                    return {
                      localeContext: {
                        ...prevState.localeContext,
                        locale: newLocale
                      }
                    }
                  })
                }
            }
        }

        this.onSearchHandler = this.onSearchHandler.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    async componentDidMount() {
        const { data } = await getUserLogged();
        this.setState(() => {
          return {
            authedUser: data,
            initializing: false
          };
        });
    }

    componentDidUpdate() {
        document.documentElement.setAttribute('data-theme', this.state.themeState.theme);
    }

    onSearchHandler(title) {
        this.setState(() => {
          return {
            search: title,
          }
        });
        this.props.changeUrlTitle(title);
    }

    async onLoginSuccess({ accessToken }) {
        putAccessToken(accessToken);
        const { data } = await getUserLogged();
        this.setState(() => {
            return {
              authedUser: data,
              initializing: false
            };
          });
    }

    onLogout() {
        this.setState(() => {
          return {
            authedUser: null
          }
        });
        putAccessToken('');
    }
    
    render() {
        if (this.state.initializing) {
            return (
                <div className="app-container">
                    <Preloader/>
                </div>
            )
        }
        
        if (this.state.authedUser === null) {
            return (           
            <ThemeProvider value={this.state.themeState}>
                <LocaleProvider value={this.state.localeContext}>
                <div className="app-container">
                    <Navigation logout={this.onLogout} name={false} />
                    <main>
                        <Routes>
                            <Route path="/register" element={< RegisterPage />}/>
                            <Route path="/" element={< LoginPage notes={this.state} loginSuccess={this.onLoginSuccess}/>}/>
                            <Route path="*" element={<NotFoundPage/>} />
                        </Routes>
                    </main>
                </div>
                </LocaleProvider>
            </ThemeProvider>         
            )
        }
        
        return (
            <LocaleProvider value={this.state.localeContext}>
            <ThemeProvider value={this.state.themeState}>
                <div className="app-container">
                    <Navigation logout={this.onLogout} name={this.state.authedUser.name} />
                    <main>
                        <Routes>
                            <Route path="/archived" element={< ArchivedPage stateSearch={this.state.search} onSearchHandler={this.onSearchHandler} changeUrlTitle={this.props.changeUrlTitle} />} />
                            <Route path="/" element={< HomePage stateSearch={this.state.search} onSearchHandler={this.onSearchHandler}/>}/>
                            <Route path="/notes/:id" element={< DetailPage/>} />
                            <Route path="/notes/new" element={< AddNotePage/>}/>
                            <Route path="/register" element={< RegisterPage />}/>
                            <Route path="*" element={<NotFoundPage/>} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
            </LocaleProvider>
        ) 
    }
}

export default AppWrapper;