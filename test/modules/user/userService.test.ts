test('demo', () => {
	const data = { one: 1, two: 0 };
	data['two'] = 2;
	expect(data).toEqual({ one: 1, two: 2 });
});
