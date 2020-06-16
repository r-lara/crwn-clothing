// Class - componentDidMount
componentDidMount() {
    console.log('I just mounted!');
}
 
//Hooks
useEffect(() => {
    console.log('I just mounted!');
}, [])


// Class - componentWillUnmount
componentWillUnmount() {
    console.log('I am unmounting');
}
 
//Hooks
useEffect(() => {
    return () => console.log('I am unmounting');
}, [])



// Class - ComponentWillReceiveProps
componentWillReceiveProps(nextProps) {
    if (nextProps.count !== this.props.count) {
        console.log('count changed', nextProps.count);
    }
}
 
// Hooks
useEffect(() => {
    console.log('count changed', props.count);
}, [props.count])


// set herku env variables
// heroku config:set STRIPE_SECRET_KEY=<YOUR_STRIPE_SECRET_KEY></YOUR_STRIPE_SECRET_KEY>

// git push heroku master
// git push heroku master --force
// heroku open