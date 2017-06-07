import { BookingAppNGPage } from './app.po';

describe('booking-app-ng App', () => {
  let page: BookingAppNGPage;

  beforeEach(() => {
    page = new BookingAppNGPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
