const byuiCourse = {
  code: 'WDD 231',
  name: 'Web Frontend Development I',
  sections: [
    { sectionNum: 1, roomNum: 'STC 353', enrolled: 26, days: 'TTh', instructor: 'Bro Tetteh' },
    { sectionNum: 2, roomNum: 'STC 347', enrolled: 28, days: 'TTh', instructor: 'Sis Abigirl' },
    { sectionNum: 3, roomNum: 'STC 385', enrolled: 35, days: 'TTh', instructor: 'Bro Ben' }
  ],
  changeEnrollment: function (sectionNum, add = true) {
    const sectionIndex = this.sections.findIndex(
      (section) => section.sectionNum === sectionNum
    );
    if (sectionIndex >= 0) {
      if (add) {
        this.sections[sectionIndex].enrolled++;
      } else if (this.sections[sectionIndex].enrolled > 0) {
        this.sections[sectionIndex].enrolled--;
      }
    }
  }
};

export default byuiCourse;
