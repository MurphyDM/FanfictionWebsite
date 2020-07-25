/*
Class
isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }
  
  componentDidMount() {
    
  }
  
  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }
  
  trackScrolling = () => {
    const wrappedElement = document.getElementById('book');
    if (this.isBottom(wrappedElement)) {
      console.log('book bottom reached');
      document.removeEventListener('scroll', this.trackScrolling);
    }
  };*/